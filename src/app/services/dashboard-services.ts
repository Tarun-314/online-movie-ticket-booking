import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';

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
}