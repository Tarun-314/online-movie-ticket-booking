import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookingDetails, TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';

@Injectable({providedIn:'root'})
export class DashboardService{
   
    private baseUrl = 'https://localhost:7263/Admin'; // Replace with your actual API base URL
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2RUQ3MDM2Qy1ERDY3LTQ1QTktQUVDMS03NEQzRTI3QzA2NzQiLCJpc3MiOiJNb3ZpZUJvb2siLCJhdWQiOlsiTW92aWVCb29rLmNvbSIsIk1vdmllQm9vay5jb20iXSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mjc2OTk5OTl9.gSpNluj_gncZ1cc22Loym3_5u9blIAKfdwOP5Z1cDls';
    constructor(private http: HttpClient) { }
    
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        });
      }

    // Function to get all theaters
    public getAllTheaters(): Observable<UTheatre[]> {
      return this.http.get<UTheatre[]>(`${this.baseUrl}/AllTheaters`, {
        headers: this.getHeaders()
      });
    }
  
    // Function to get all movies
    public getAllMovies(): Observable<UMovie[]> {
      return this.http.get<UMovie[]>(`${this.baseUrl}/AllMovies`, {
        headers: this.getHeaders()
      });
    }
  
    // Function to get all theater movies with names
    public getAllTheatreMovies(): Observable<TheatreMovieWithName[]> {
      return this.http.get<TheatreMovieWithName[]>(`${this.baseUrl}/GetAllTheatreMovies`, {
        headers: this.getHeaders()
      });
    }
  
    // Function to get all users with booking count
    public getAllUsers(): Observable<UserWithBookingCount[]> {
      return this.http.get<UserWithBookingCount[]>(`${this.baseUrl}/GetAllUsers`, {
        headers: this.getHeaders()
      });
    }

    getBookings(): Observable<BookingDetails[]> {
      return this.http.get<BookingDetails[]>(`${this.baseUrl}/GetAllBookings`, {
        headers: this.getHeaders()
      });
    }

    // Function to update a movie
    public updateMovie(updatedMovie: UMovie): Observable<string> {
      return this.http.put<string>(`${this.baseUrl}/UpdateMovie`, updatedMovie, {
        headers: this.getHeaders()
      });
    }

    // Function to update a theatre
    public updateTheatre(updatedTheatre: UTheatre): Observable<string> {
      return this.http.put<string>(`${this.baseUrl}/UpdateTheatre`, updatedTheatre, {
        headers: this.getHeaders()
      });
    }

    // Function to update a theatre movie
    public updateTheatreMovie(updatedTheatreMovie: TheatreMovieWithName): Observable<string> {
      return this.http.put<string>(`${this.baseUrl}/UpdateTheatreMovie`, updatedTheatreMovie, {
        headers: this.getHeaders()
      });
    }
    deleteMovie(movieId: string): Observable<string> {
      const url = `${this.baseUrl}/DeleteMovie/${movieId}`;
      return this.http.delete<string>(url,{
        headers: this.getHeaders()
      });
    }
  
    deleteTheatre(theatreId: string): Observable<string> {
      const url = `${this.baseUrl}/DeleteTheatre/${theatreId}`;
      return this.http.delete<string>(url,{
        headers: this.getHeaders()
      });
    }
  
    deleteTheatreMovie(theatreMovieId: string): Observable<string> {
      const url = `${this.baseUrl}/DeleteTheatreMovie/${theatreMovieId}`;
      return this.http.delete<string>(url,{
        headers: this.getHeaders()
      });
    }
    insertMovie(movie: UMovie): Observable<string> {
      const url = `${this.baseUrl}/InsertMovie`;
      return this.http.post<string>(url, movie,{
        headers: this.getHeaders()
      });
    }
  
    insertTheatre(theatre: UTheatre): Observable<string> {
      const url = `${this.baseUrl}/InsertTheatre`;
      return this.http.post<string>(url, theatre,{
        headers: this.getHeaders()
      });
    }
  
    insertTheatreMovie(theatreMovie: TheatreMovieWithName): Observable<string> {
      const url = `${this.baseUrl}/InsertTheatreMovie`;
      return this.http.post<string>(url, theatreMovie, {
        headers: this.getHeaders()
      });
    }
    blockUser(userId: string): Observable<string> {
      alert(userId)
      const url = `${this.baseUrl}/BlockUser/${userId}`;
      return this.http.post<string>(url,null,{
        headers: this.getHeaders()
      });
    }
  
    unblockUser(userId: string): Observable<string> {
      const url = `${this.baseUrl}/UnblockUser/${userId}`;
      return this.http.post<string>(url,null,{
        headers: this.getHeaders()
      });
    }
  
    deleteUser(userId: string): Observable<string> {
      const url = `${this.baseUrl}/DeleteUser/${userId}`;
      return this.http.delete<string>(url, {
        headers: this.getHeaders()
      });
    }
}