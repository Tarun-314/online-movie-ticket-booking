import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { City, Coupon, LinkedMovies, Movie, Multiplex, Bookings, Review, User, Payment, LoggedInUser, IUser, DataTransferObject, BookingHistory } from "../models/data-model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class DataService
{
    private baseurl="https://localhost:7263"; 
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Authorization': `Bearer ${this.user.token}`,
          'Content-Type': 'application/json'
        });
      }

    private selectedCitySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    selectedCity$: Observable<string> = this.selectedCitySubject.asObservable();
  
    cityobj: City = new City(["Hyderabad", "Chennai", "Mumbai", "Delhi", "Kolkata"]);
    cities: string[] = this.cityobj.cities;
  
    constructor(private http:HttpClient) {
      const savedCity = localStorage.getItem('selectedCity');
      if (savedCity) {
        this.selectedCitySubject.next(savedCity);
      } else {
        this.selectedCitySubject.next(this.getCities()[0]);
      }
      this.selectedCity$.subscribe(city => {
        localStorage.setItem('selectedCity', city);
      });
    }

    private baseUrl:string = 'https://localhost:7263';

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
        'Authorization': `Bearer ${this.user.token}`,
        'Content-Type': 'application/json'
        });
    }
  
    getCities(): string[] {
      return this.cities;
    }
  
    setCity(city: string): void {
      this.selectedCitySubject.next(city);
    }

    getCity():string
    {
        return this.selectedCitySubject.getValue();
    }

    private multiplexesSubject = new BehaviorSubject<string>('');
    multiplexes$ = this.multiplexesSubject.asObservable();

    private multiplexes: Multiplex[] = [];

    // Function to get all theaters
    public getAllTheatersAPI(): Observable<Multiplex[]> {
        return this.http.get<Multiplex[]>(`${this.baseUrl}/AllTheaters`, {
        headers: this.getHeaders()
        });
    }

    // Function to fetch and assign data to multiplexes array
    public fetchAndAssignTheaters(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getAllTheatersAPI().subscribe(
                (data: any[]) => {
                    this.multiplexes = data.map(item => new Multiplex(
                        item.theatreId,
                        item.name,
                        item.area,
                        item.location,
                        item.ratings,
                        item.screens,
                        item.totalSeats,
                        item.image,
                        new Date(item.updatedAt)
                    ));
                    this.multiplexesSubject.next("multiplexes");
                    resolve();
                },
                (error) => {
                    console.error('Error fetching theaters:', error);
                    reject(error);
                }
            );
        });
    }
    

    // Function to get multiplexes by city
    public getMultiplexByCity(city: string): Multiplex[] {
        return this.multiplexes.filter(multiplex => multiplex.Area === city);
    }

    getMultiplexes():Multiplex[]
    {
        return this.multiplexes;
    }

    getMultiplexById(id:string):Multiplex
    {
        return this.multiplexes.find(multiplex => multiplex.TheatreID === id);
    }

    private movies: Movie[] = [];

    private movieSubject = new BehaviorSubject<string>('');
    movies$ = this.movieSubject.asObservable();

    // Function to get all movies
    public getAllMoviesAPI(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.baseUrl}/AllMovies`, {
        headers: this.getHeaders()
        });
    }

    public fetchAndAssignMovies(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getAllMoviesAPI().subscribe(
                (data: any[]) => {
                    this.movies = data.map(item => new Movie(
                        item.movieId,
                        item.title,
                        item.genre,
                        item.duration,
                        new Date(item.releaseDate),
                        item.rating ?? 0, // Default to 0 if Rating is null
                        item.likes,
                        item.description,
                        item.casting,
                        item.trailer,
                        item.language,
                        item.image,
                        item.updatedAt ? new Date(item.updatedAt) : new Date() // Default to current date if UpdatedAt is null
                    ));
                    this.movieSubject.next("movies");
                    resolve();
                },
                (error) => {
                    console.error('Error fetching movies:', error);
                    reject(error);
                }
            );
        });
    }
    
    getMovies(): Movie[] {
        return this.movies;
    }

    getMovieById(id:string):Movie
    {
        return this.movies.find(movie => movie.MovieID === id);
    }

    private reviewsSubject = new BehaviorSubject<string>('');
    reviews$ = this.reviewsSubject.asObservable();

    private reviews: Review[] = [];

    // Function to get all movies
    public getAllReviewsAPI(movieID:string): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.baseUrl}/Reviews/${movieID}`, {
        headers: this.getHeaders()
        });
    }

    getDefaultMovies(): Movie[] {
        const sortedMovies = this.movies.sort((a, b) => {
          const dateA = new Date(a.ReleaseDate);
          const dateB = new Date(b.ReleaseDate);
          return dateB.getTime() - dateA.getTime(); // Sort in descending order
        });
      
        return sortedMovies.slice(0, 4); // Return only the top 4 movies
    }  

    getMoviesByName(search: string): Movie[] {
        return this.movies.filter(movie => movie.Title.toLowerCase().startsWith(search.toLowerCase()));
    }

    public fetchAndAssignReviews(movieID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getAllReviewsAPI(movieID).subscribe(
                (data: any[]) => {
                    this.reviews = data.map(item => new Review(
                        item.reviewID,
                        item.userID,
                        item.userName,
                        item.movieID,
                        item.rating ?? 0, // Default to 0 if Rating is null
                        item.comment ?? '', // Default to empty string if Comment is null
                        item.reviewDate ? new Date(item.reviewDate) : new Date() // Default to current date if ReviewDate is null
                    ));
                    this.reviewsSubject.next("reviews");
                    resolve();
                },
                (error) => {
                    console.error('Error fetching reviews:', error);
                    reject(error);
                }
            );
        });
    }    
  
    getReviews(movieID: string): Review[] {
        return this.reviews.filter(review => review.MovieID === movieID);
    }

    pushReview(review: Review)
    {
      this.reviews.push(review);
    }
   
    postReview(review: Review): Observable<any> {
      const url = `${this.baseUrl}/AddReview`;
      return this.http.post<any>(url, review, {
        headers: this.getHeaders()
      });
    }

    canAddReview(movieID: string): Observable<boolean> {
      const url = `${this.baseUrl}/CanAddReview?movieId=${movieID}`;
      return this.http.get<boolean>(url, {
        headers: this.getHeaders()
      });
    }


    private user:LoggedInUser;

    // private users:User[] = [
    //     {
    //         UserID: '0EC74B46-6419-4049-A24E-7B1E0DF6616E',
    //         FullName: 'Chris Wilson',
    //         PasswordHash: 'hash6',
    //         Email: 'chriswilson@example.com',
    //         PhoneNumber: '6789012345',
    //         Bookings: '0',
    //         SecurityQuestion: 'What is your favorite book?',
    //         SecurityAnswer: 'To Kill a Mockingbird',
    //         Role: 'User',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     },
    //     {
    //         UserID: '2BC57594-3F0D-473E-B2D4-6829F4B8290D',
    //         FullName: 'David Anderson',
    //         PasswordHash: 'hash8',
    //         Email: 'davidanderson@example.com',
    //         PhoneNumber: '8901234567',
    //         Bookings: '0',
    //         SecurityQuestion: 'What is the name of the city where you were born?',
    //         SecurityAnswer: 'Chicago',
    //         Role: 'User',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     },
    //     {
    //         UserID: '3980E8A0-9C28-448E-A989-4E5B9ABF726B',
    //         FullName: 'Linda Thompson',
    //         PasswordHash: 'hash9',
    //         Email: 'lindathompson@example.com',
    //         PhoneNumber: '9012345678',
    //         Bookings: '0',
    //         SecurityQuestion: 'What was your dream job as a child?',
    //         SecurityAnswer: 'Astronaut',
    //         Role: 'User',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     },
    //     {
    //         UserID: '5DBCF802-C88C-4EF4-9FC9-E7C0B0CD710F',
    //         FullName: 'Admin2',
    //         PasswordHash: 'adminhash2',
    //         Email: 'admintwo@example.com',
    //         PhoneNumber: '2233445566',
    //         Bookings: '0',
    //         SecurityQuestion: 'What was the make and model of your first car?',
    //         SecurityAnswer: 'Ford Mustang',
    //         Role: 'Admin',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     },
    //     {
    //         UserID: '6ED7036C-DD67-45A9-AEC1-74D3E27C0674',
    //         FullName: 'Admin1',
    //         PasswordHash: 'adminhash1',
    //         Email: 'adminone@example.com',
    //         PhoneNumber: '1122334455',
    //         Bookings: '0',
    //         SecurityQuestion: 'What is the name of your first pet?',
    //         SecurityAnswer: 'Max',
    //         Role: 'Admin',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     },
    //     {
    //         UserID: '72F61BA2-B98C-4D6A-8EF5-D0B8F556E273',
    //         FullName: 'Mike Johnson',
    //         PasswordHash: 'hash3',
    //         Email: 'mikejohnson@example.com',
    //         PhoneNumber: '3456789012',
    //         Bookings: '0',
    //         SecurityQuestion: 'What is your mother\'s maiden name?',
    //         SecurityAnswer: 'Williams',
    //         Role: 'User',
    //         UpdatedAt: new Date('2024-08-24 08:39:13')
    //     }
    // ];

    // getUsers():User[]
    // {
    //     return this.users;
    // }
    
    setUserProfile(user:IUser):Observable<DataTransferObject>{
        return this.htttp.put<DataTransferObject>(`${this.baseurl}/UpdateUser`,user,{
            headers:this.getHeaders()
        });
    }

    getUserProfile():Observable<IUser>
    {
        return this.htttp.get<IUser>(`${this.baseurl}/GetUserById`,{
            headers:this.getHeaders()
        });
    }

    getUserDetails():LoggedInUser
    {
        return this.user;
    }

    setUser(user:LoggedInUser)
    {
        this.user=user;
    }

    private user_purchases: Bookings[] = [
        new Bookings(
          'BookingID1', // Replace with actual BookingID
          '0DF0AFEC-B326-4ED3-8094-7BE78F1EDC11', // Replace with actual UserID
          'MovieID1', // Replace with actual MovieID
          'MovieID1', // Replace with actual MovieID
          'TheatreID1', // Replace with actual TheatreID
          'TheatreID1', // Replace with actual TheatreID
          new Date('2024-08-15'),
          new Date('2024-08-15'), // ShowDate
          '06:00 AM',
          1, // ScreenNumber
          2, // NumberOfSeats
          'A5, A6',
          500, // TotalPrice
          "Txfei3r",
          'Pending', // Status
          'Credit Card'
        ),
        new Bookings(
          'BookingID2', 
          '0DF0AFEC-B326-4ED3-8094-7BE78F1EDC11', 
          'MovieID2', 
          'MovieID2', 
          'TheatreID2', 
          'TheatreID2', 
          new Date('2024-08-15'),
          new Date('2024-08-15'), 
          '06:00 AM',
          1, 
          2, 
          'A5, A6',
          500, 
          "Txuwegfwe",
          'Pending', 
          'Credit Card'
        )
      ];
      
      
    getUserPurchaseHistory():Observable<BookingHistory[]>
    {
        return this.htttp.get<BookingHistory[]>(`${this.baseurl}/GetBookingsByUserId`,{
            headers:this.getHeaders()
        });
    }
      

    getAllUsersHistory()
    {
        return this.user_purchases;
    }

    private linkedMovies:LinkedMovies[] = [
        new LinkedMovies(
          '05B467B0-3788-4726-ADC1-415C079B73DB',
          'Theatre A',
          'Delhi',
          '1441A9C5-EB00-493C-8F54-2C14C74A3AFF',
          'Movie A',
          'https://wallpapercave.com/wp/wp10314725.jpg',
          'Telugu',
          new Date('2024-08-25'),
          7989829,
          8.9,
          1,
          new Date('2024-09-05'),
          '{"09:30 AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","12:30 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","03:30 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","06:30 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
          '80,80,80,80'
        ),

        new LinkedMovies(
          '05B467B0-3788-4726-ADC1-415C079B73DB',
          'Theatre A',
          'Delhi',
          '31BD7D4C-B4C4-44D3-9B96-F37720B1F95E',
          'Movie A',
          'https://wallpapercave.com/wp/wp10314725.jpg',
          'Telugu',
          new Date('2024-08-25'),
          7989829,
          8.9,
          1,
          new Date('2024-09-05'),
          '{"08:00 AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","11:00 AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","02:00 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","05:00 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
          '80,80,80,80'
        ),

        new LinkedMovies(
          '05B467B0-3788-4726-ADC1-415C079B73DB',
          'Theatre B',
          'Delhi',
          '1441A9C5-EB00-493C-8F54-2C14C74A3AFF',
          'Movie B',
          'https://wallpapercave.com/wp/wp10314725.jpg',
          'Telugu',
          new Date('2024-08-25'),
          7989829,
          8.9,
          1,
          new Date('2024-09-01'),
          '{"09:00 AM":"11100000000000000000000000000000000000000000000000000000000000000000000000000000","11:00 AM":"00111100000000000000000000000000000000000000000000000000000000000000000000000000","02:00 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","05:00 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","08:00 PM":"0000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
        '80,80,80,80,80'),
    
        new LinkedMovies(
            '05B467B0-3788-4726-ADC1-415C079B73DB',
            'Theatre A',
            'Delhi',
            'C4DA0DB8-F320-41F9-9DDF-BF858C8643C2',
            'Movie B',
            'https://wallpapercave.com/wp/wp10314725.jpg',
            'Telugu',
            new Date('2024-08-25'),
            7989829,
            8.9,
            1,
            new Date('2024-09-05'),
            '{"11:00 AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","02:00 PM":"00000001111000000000000000000000000000000000000000000000000000000000000000000000","05:00 PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","08:00 PM":"0000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
          '80,80,80,80')
    ];
    
    getLinkedMovies():LinkedMovies[]
    {
        return this.linkedMovies;
    }

    getLinkedMoviesByIDDate(theatreID: string, date: string): LinkedMovies[] {
        return this.linkedMovies.filter(movie => movie.TheatreID === theatreID && movie.ShowDate.toISOString().split('T')[0] === date);
    }      

    getLinkedMulsByIDDateCity(movieID: string, date:string): LinkedMovies[]    {
        return this.linkedMovies.filter(movie => movie.MovieID === movieID && movie.ShowDate.toISOString().split('T')[0] === date && movie.Area === this.getCity());
    }

    getSeatString(multiplexID: string, movieName: string, selectedDate: string, selectedTime: string): string {

        for (const movie of this.linkedMovies) {
            if (
                movie.TheatreID === multiplexID &&
                movie.MovieName === movieName &&
                movie.ShowDate.toISOString().split('T')[0] === selectedDate 
            ) {
                const showTimes = JSON.parse(movie.ShowTimes);
                if (showTimes[selectedTime]) {
                    return showTimes[selectedTime];
                }
            }
        }
        
        return "00000000000000000000000000000000000000000000000000000000000000000000000000000000";
    }

    setSeatString(multiplexID: string, movieName: string, selectedDate: string, selectedTime: string, newSeatString: string): boolean {
        for (const movie of this.linkedMovies) {
          if (
            movie.TheatreID === multiplexID &&
            movie.MovieName === movieName &&
            movie.ShowDate.toISOString().split('T')[0] === selectedDate
          ) {
            const showTimes = JSON.parse(movie.ShowTimes);
            if (showTimes[selectedTime]) {
              showTimes[selectedTime] = newSeatString;
              movie.ShowTimes = JSON.stringify(showTimes);
              return true;
            }
          }
          else
            return false;
        }
      }


    private coupons: Coupon[] = [
        new Coupon('30DD82FA-D8FF-4CE6-8473-232BC57C0D66', 'HOLIDAY100', 100.00),
        new Coupon('945A0001-1ABC-415F-A049-8F2DC895B6C3', 'SAVE50', 50.00),
        new Coupon('A838ACA6-713D-4D78-8AE3-876A9B00D8DD', 'NEWYEAR50', 50.00),
        new Coupon('ED28FB1A-AE98-4D54-8058-C7DD0885C927', 'FLASHSALE150', 150.00)
    ];

    getCoupon(couponCode: string): number {
        const coupon = this.coupons.find(c => c.CouponCode === couponCode);
        return coupon ? coupon.DiscountAmount : 0;
    }
    
}