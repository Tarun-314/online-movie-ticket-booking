// services/movie-statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TheatreMovieWithName } from '../models/service-model';
import { MovieSales } from '../models/service-model';
import { Movie } from '../models/service-model';

@Injectable({
  providedIn: 'root'
})
export class MovieStatisticsService {
  private apiUrl = 'http://your-api-url/Statistics';

  constructor(private http: HttpClient) { }

  getMoviesInWeek(multiplexName: string, startDate: string, endDate: string): Observable<TheatreMovieWithName[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<TheatreMovieWithName[]>(`${this.apiUrl}/week/${multiplexName}`, { params });
  }

  getTotalTicketSales(movieName: string, month: string): Observable<number> {
    const params = new HttpParams().set('month', month);
    return this.http.get<number>(`${this.apiUrl}/sales/${movieName}`, { params });
  }

  getSalesByQuarter(year: number, quarter: number): Observable<MovieSales[]> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('quarter', quarter.toString());
    return this.http.get<MovieSales[]>(`${this.apiUrl}/sales/quarter`, { params });
  }

  getMovieOfTheMonth(month: string): Observable<Movie> {
    const params = new HttpParams().set('month', month);
    return this.http.get<Movie>(`${this.apiUrl}/movie-of-the-month`, { params });
  }

  getDisasterOfTheMonth(month: string): Observable<Movie> {
    const params = new HttpParams().set('month', month);
    return this.http.get<Movie>(`${this.apiUrl}/disaster-of-the-month`, { params });
  }
}
