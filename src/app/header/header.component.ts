import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { Movie, User } from '../models/data-model';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Cities: string[] = [];
  selectedCity: string = '';
  user: User;
  citySubscription: Subscription;
  searchedMovies: Movie[] = [];
  searchMovie: string = '';
  isDropdownOpen: boolean = false;
  noMoviesFound: boolean = false;

  constructor(private dataService: DataService, private router: Router) {
    this.Cities = dataService.getCities();
    this.selectedCity = this.Cities[0];
    try {
      this.user = this.dataService.getUserDetails();
    } catch (e) {
      this.router.navigate(['/error']);
    }

    // Close dropdown and clear search on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
        this.searchMovie = '';
        this.searchedMovies = [];
        this.noMoviesFound = false;
      }
    });
  }

  ngOnInit() {
    this.citySubscription = this.dataService.selectedCity$.subscribe(city => {
      this.selectedCity = city;
    });
  }

  onSearch(): void {
    if (this.searchMovie.trim() === '') {
      this.searchedMovies = this.dataService.getDefaultMovies();
      this.noMoviesFound = false;
    } else {
      this.searchedMovies = this.dataService.getMoviesByName(this.searchMovie);
      this.noMoviesFound = this.searchedMovies.length === 0;
    }
    this.isDropdownOpen = this.searchedMovies.length > 0 || this.noMoviesFound;
    console.log('Dropdown open:', this.isDropdownOpen);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.flex-fill')) {
      this.isDropdownOpen = false;
    }
  }

  onInputClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.searchMovie = '';
  }

  onMovieSelect(movie: any): void {
    console.log('Selected movie:', movie);
    this.closeDropdown();
  }

  selectCity(city: string): void {
    this.selectedCity = city;
    this.dataService.setCity(this.selectedCity);

    const currentRoute = this.router.url;
    if (currentRoute.includes('/mul-details')) {
      this.router.navigate(['/home']);
    }
  }
}
