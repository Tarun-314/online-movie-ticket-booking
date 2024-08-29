import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City, LinkedMovies, Movie, Multiplex, PurchaseHistory, Review, User } from "../models/data-model";

@Injectable({providedIn:'root'})
export class DataService
{

    private selectedCitySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    selectedCity$: Observable<string> = this.selectedCitySubject.asObservable();

    constructor() {
        this.selectedCitySubject.next(this.getCities()[0]); 
    }

    cityobj:City = new City(["Hyderabad", "Chennai", "Mumbai", "Delhi", "Kolkata"]);
    cities:string[] = this.cityobj.cities;
    getCities():string[]
    {
        return this.cities;
    }

    setCity(city: string): void {
        this.selectedCitySubject.next(city);
    }

    multiplexes: Multiplex[] = [
    new Multiplex(
        '05B467B0-3788-4726-ADC1-415C079B73DB',
        'Liberty Cinema',
        'Delhi',
        'https://maps.app.goo.gl/VQ2wiVrN4u1eDLdx7',
        4.2,
        1,
        100,
        'https://www.shutterstock.com/image-vector/theater-cinema-building-vector-easy-600nw-617664407.jpg',
        new Date('2024-08-24T08:52:02')
    ),
    new Multiplex(
        '1F5F85B4-56C3-40D1-AC54-0010766AEBA6',
        'INOX',
        'Mumbai',
        'https://maps.app.goo.gl/Y5E4XeBSGmKKdg9R8',
        3.4,
        3,
        150,
        'https://img.freepik.com/free-vector/mobile-theater-building_1441-3091.jpg',
        new Date('2024-08-24T08:52:02')
    ),
    new Multiplex(
        '738C465F-3F3D-4EE8-AD1E-0E2D88CC79CE',
        'Prasads IMAX',
        'Hyderabad',
        'https://maps.app.goo.gl/GBDucfAbtrUfrt2W7',
        4.9,
        4,
        150,
        'https://thumbs.dreamstime.com/b/theater-cinema-building-vector-easy-to-change-color-object-87801280.jpg',
        new Date('2024-08-24T08:52:02')
    ),
    new Multiplex(
        'ADDFCDD2-3408-4298-A67C-06F2A39A3C28',
        'Cinepolis',
        'Kolkata',
        'https://maps.app.goo.gl/LtZhsXfKhA12jc6t7',
        4.4,
        2,
        100,
        'https://t4.ftcdn.net/jpg/02/64/00/35/360_F_264003520_35cDD1EjBGRPhX03PFsK5WohoMXzzZts.jpg',
        new Date('2024-08-24T08:52:02')
    ),
    new Multiplex(
        'B9580FCE-6131-4365-81AF-6E25F88C5983',
        'Ksquare Cinemas',
        'Chennai',
        'https://maps.app.goo.gl/tga5TDz1mhKaUFmc8',
        4.6,
        4,
        100,
        'https://static.vecteezy.com/system/resources/thumbnails/004/595/986/small/movie-premiere-in-cinema-theater-flat-illustration-vector.jpg',
        new Date('2024-08-24T08:52:02')
    ),
    new Multiplex(
        'C23E9179-BA75-4C5D-AFFC-E8C5CF03AEE6',
        'PVR Premiere',
        'Delhi',
        'https://maps.app.goo.gl/X3krcfaafnwx1fDp9',
        4.7,
        3,
        150,
        'https://img.freepik.com/premium-vector/cinema-building-vector-illustration-background-city-night-movie-theater_584989-7.jpg?semt=ais_hybrid',
        new Date('2024-08-24T08:52:02')
    )
    ];

    getMultiplexes():Multiplex[]
    {
        return this.multiplexes;
    }

    getMultiplexById(id:string):Multiplex
    {
        return this.multiplexes.find(multiplex => multiplex.TheatreID === id);
    }

    getMultiplexByCity(c:string):Multiplex[]
    {
        return this.multiplexes.filter(multiplex => multiplex.Area === c);
    }

    getMovieById(id:string):Movie
    {
        return this.movies.find(movie => movie.MovieID === id);
    }

    movies: Movie[] = [
    new Movie(
        '00E57EEB-5B5B-446A-8C8C-D01032D59552',
        'PK',
        'Comedy, Drama, Fantasy',
        153,
        new Date('2014-12-19'),
        8.1,
        1400000,
        'An alien on Earth loses the device he needs to return home.',
        'Aamir Khan, Anushka Sharma',
        'https://youtu.be/82ZEDGPCkT8',
        'Hindi',
        'https://posters.movieposterdb.com/14_10/2014/2338151/l_2338151_bc05a886.jpg',
        new Date('2024-08-24T08:37:24')
    ),
    new Movie(
        '1441A9C5-EB00-493C-8F54-2C14C74A3AFF',
        'Super 30',
        'Biography, Drama, Sport',
        154,
        new Date('2019-07-12'),
        7.9,
        700000,
        'The story of mathematician Anand Kumar and his educational program.',
        'Hrithik Roshan, Mrunal Thakur',
        'https://youtu.be/QpvEWVVnICE',
        'Hindi',
        'https://posters.movieposterdb.com/20_01/2019/7485048/l_7485048_23bcf73b.jpg',
        new Date('2024-08-24T08:37:24')
    ),
    new Movie(
        '1615F1E0-F21E-42C9-A7A3-89988460EF0F',
        'Dilwale Dulhania Le Jayenge',
        'Romance, Drama, Musical',
        189,
        new Date('1995-10-20'),
        8.1,
        1600000,
        'A young man and woman fall in love during a trip across Europe.',
        'Shah Rukh Khan, Kajol',
        'https://youtu.be/CZC6kBCJ8Co',
        'Hindi',
        'https://posters.movieposterdb.com/08_08/1995/112870/l_112870_6b1f6e1c.jpg',
        new Date('2024-08-24T08:37:24')
    ),
    new Movie(
        '24E83A8B-4CE0-4E2F-B612-EA2CFDD1F395',
        'KGF: Chapter 1',
        'Action, Drama, Thriller',
        156,
        new Date('2018-12-21'),
        8.2,
        1400000,
        'In the 1970s, a gangster embarks on a quest to conquer the world.',
        'Yash, Srinidhi Shetty',
        'https://youtu.be/SOXWc32k4zA?si=eje_o774s4IVHrO_',
        'Kannada',
        'https://posters.movieposterdb.com/20_01/2018/7838252/l_7838252_b729a9ef.jpg',
        new Date('2024-08-24T08:37:24')
    ),
    new Movie(
        '2903FDD6-F893-4EC4-99EA-0716B37D7207',
        '3 Idiots',
        'Comedy, Drama, Romance',
        170,
        new Date('2009-12-25'),
        8.4,
        1500000,
        'Two friends are searching for their long-lost companion.',
        'Aamir Khan, Kareena Kapoor',
        'https://youtu.be/K0eDlFX9GMc',
        'Hindi',
        'https://posters.movieposterdb.com/11_04/2009/1187043/l_1187043_08abeabd.jpg',
        new Date('2024-08-24T08:37:24')
    ),
    new Movie(
        '31BD7D4C-B4C4-44D3-9B96-F37720B1F95E',
        'Bahubali 2: The Conclusion',
        'Action, Drama, Fantasy',
        171,
        new Date('2017-04-28'),
        8.2,
        1700000,
        'The son of a warrior returns to avenge his father\'s death.',
        'Prabhas, Anushka Shetty',
        'https://youtu.be/G62HrubdD6o',
        'Telugu',
        'https://posters.movieposterdb.com/19_12/2017/4849438/l_4849438_057d0afb.jpg',
        new Date('2024-08-24T08:37:24')
    )
    ];

    getMovies(): Movie[] {
        return this.movies;
    }

    reviews: Review[] = [
        new Review('0DFFA809-CAE2-4C33-A9F1-1370DAC12BFA','2BC57594-3F0D-473E-B2D4-6829F4B8290D','User A','31BD7D4C-B4C4-44D3-9B96-F37720B1F95E', 4, 'A beautiful story of self-discovery.', new Date('2024-08-24T14:52:27')),
        new Review('0E07FEF1-377C-448C-B5CB-96C0F7AEB647','0EC74B46-6419-4049-A24E-7B1E0DF6616E','User B','31BD7D4C-B4C4-44D3-9B96-F37720B1F95E', 4.5, 'Mind-blowing visuals and action.', new Date('2024-08-24T14:45:44')),
        new Review('0ECCBB1C-5860-46DE-AE43-E6F40278ED29','3980E8A0-9C28-448E-A989-4E5B9ABF726B','User C','F3C55992-42B9-43A6-B4BA-C785D1938FDD', 4.5, 'A dark and captivating tale.', new Date('2024-08-24T14:56:21')),
        new Review('13CDBE62-6607-46D3-91F1-1F782082F593','A8A81330-CEFA-4D0A-999B-C3078EC91399','User D','C4DA0DB8-F320-41F9-9DDF-BF858C8643C2', 5, 'A tribute to friendship and life.', new Date('2024-08-24T14:54:11')),
        new Review('156796B9-63C4-4CCB-A540-F995B1C027AB','B3FD5712-AC69-4286-B104-A2D977F8042F','User E','31BD7D4C-B4C4-44D3-9B96-F37720B1F95E', 5, 'A visual and atmospheric masterpiece.', new Date('2024-08-24T14:56:21')),
        new Review('1B517556-B2AD-4629-BAB6-AF8C3466683C','A97105C6-4526-4241-803E-E83E8050474F','User F','C18CE3D7-5126-4D68-AC19-6479C29A60C1', 3, 'Controversial but well-made film.', new Date('2024-08-24T14:53:32')),
        new Review('1BBDC8AD-7387-4C2D-9917-ECE902AD94E9','2BC57594-3F0D-473E-B2D4-6829F4B8290D','User G','367A21B8-8A5F-43A4-8BFB-77FD465CD5F3', 5, 'A must-watch for every Indian!', new Date('2024-08-24T14:41:58')),
        new Review('216F903A-C98F-462E-9BB0-D9237AE65908','3980E8A0-9C28-448E-A989-4E5B9ABF726B','User H','31BD7D4C-B4C4-44D3-9B96-F37720B1F95E', 5, 'Kangana Ranaut shines in this inspiring film.', new Date('2024-08-24T14:52:27'))
    ];

    getReviews(movieID: string): Review[] {
        return this.reviews.filter(review => review.MovieID === movieID);
    }
 
    addReview(Rev:Review)
    {
        this.reviews.push(Rev);
    }

    user:User = new User(
        '0DF0AFEC-B326-4ED3-8094-7BE78F1EDC11',
        'Sarah Brown',
        'hash5',
        'sarahbrown@example.com',
        '5678901234',
        '0',
        'first_pet',
        'harry',
        'User',
        new Date('2024-08-24T08:39:13')
    );

    users:User[] = [
        {
            UserID: '0EC74B46-6419-4049-A24E-7B1E0DF6616E',
            FullName: 'Chris Wilson',
            PasswordHash: 'hash6',
            Email: 'chriswilson@example.com',
            PhoneNumber: '6789012345',
            Bookings: '0',
            SecurityQuestion: 'What is your favorite book?',
            SecurityAnswer: 'To Kill a Mockingbird',
            Role: 'User',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        },
        {
            UserID: '2BC57594-3F0D-473E-B2D4-6829F4B8290D',
            FullName: 'David Anderson',
            PasswordHash: 'hash8',
            Email: 'davidanderson@example.com',
            PhoneNumber: '8901234567',
            Bookings: '0',
            SecurityQuestion: 'What is the name of the city where you were born?',
            SecurityAnswer: 'Chicago',
            Role: 'User',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        },
        {
            UserID: '3980E8A0-9C28-448E-A989-4E5B9ABF726B',
            FullName: 'Linda Thompson',
            PasswordHash: 'hash9',
            Email: 'lindathompson@example.com',
            PhoneNumber: '9012345678',
            Bookings: '0',
            SecurityQuestion: 'What was your dream job as a child?',
            SecurityAnswer: 'Astronaut',
            Role: 'User',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        },
        {
            UserID: '5DBCF802-C88C-4EF4-9FC9-E7C0B0CD710F',
            FullName: 'Admin2',
            PasswordHash: 'adminhash2',
            Email: 'admintwo@example.com',
            PhoneNumber: '2233445566',
            Bookings: '0',
            SecurityQuestion: 'What was the make and model of your first car?',
            SecurityAnswer: 'Ford Mustang',
            Role: 'Admin',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        },
        {
            UserID: '6ED7036C-DD67-45A9-AEC1-74D3E27C0674',
            FullName: 'Admin1',
            PasswordHash: 'adminhash1',
            Email: 'adminone@example.com',
            PhoneNumber: '1122334455',
            Bookings: '0',
            SecurityQuestion: 'What is the name of your first pet?',
            SecurityAnswer: 'Max',
            Role: 'Admin',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        },
        {
            UserID: '72F61BA2-B98C-4D6A-8EF5-D0B8F556E273',
            FullName: 'Mike Johnson',
            PasswordHash: 'hash3',
            Email: 'mikejohnson@example.com',
            PhoneNumber: '3456789012',
            Bookings: '0',
            SecurityQuestion: 'What is your mother\'s maiden name?',
            SecurityAnswer: 'Williams',
            Role: 'User',
            UpdatedAt: new Date('2024-08-24 08:39:13')
        }
    ];

    getUsers():User[]
    {
        return this.users;
    }
    
    getUserDetails():User
    {
        return this.user;
    }

    user_purchases:PurchaseHistory[] = [new PurchaseHistory(
        'Tholi Prema',
        'Inox PVR',
        new Date('2024-08-15'),
        '06:00 AM',
        'A5, A6',
        '₹500',
        'TXN123456789',
        'Credit Card'
      ),
       new PurchaseHistory(
        'Tholi Prema',
        'Inox PVR',
        new Date('2024-08-15'),
        '06:00 AM',
        'A5, A6',
        '₹500',
        'TXN123456789',
        'Credit Card'
      )];
      
    getUserPurchaseHistory():PurchaseHistory[]
    {
        return this.user_purchases;
    }

    linkedMovies:LinkedMovies[] = [
        new LinkedMovies(
          '0192E9D2-B38D-4878-BBED-80FE3AB16E11',
          '05B467B0-3788-4726-ADC1-415C079B73DB',
          'Theatre A',
          '1441A9C5-EB00-493C-8F54-2C14C74A3AFF',
          'Movie A',
          1,
          new Date('2024-08-28'),
          '{"9:30AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","12:30PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","3:30PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","6:30PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
          '80,80,80,80'
        ),

        new LinkedMovies(
          '024E8F30-2EF8-4723-A380-1B1670EDB425',
          'F8B39DB1-8113-440E-B414-332A54E17EF8',
          'Theatre A',
          '31BD7D4C-B4C4-44D3-9B96-F37720B1F95E',
          'Movie A',
          1,
          new Date('2024-08-30'),
          '{"8:00AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","11:00AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","2:00PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","5:00PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
          '80,80,80,80'
        ),

        new LinkedMovies(
          '04B77770-AA27-4F2D-8A36-67AEB55C4A9C',
          'D90F1552-7CB1-4611-879F-CFF2B676FA72',
          'Theatre A',
          'C4DA0DB8-F320-41F9-9DDF-BF858C8643C2',
          'Movie A',
          1,
          new Date('2024-08-28'),
          '{"11:00AM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","2:00PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","5:00PM":"00000000000000000000000000000000000000000000000000000000000000000000000000000000","8:00PM":"0000000000000000000000000000000000000000000000000000000000000000000000000000000"}',
        '80,80,80,80')];
    
    getLinkedMovies():LinkedMovies[]
    {
        return this.linkedMovies;
    }
}