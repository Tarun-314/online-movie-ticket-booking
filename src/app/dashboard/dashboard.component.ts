import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';
import { DashboardService } from '../services/dashboard-services';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewChecked {
  
  constructor(private service:DashboardService){}
  
  MUmultiplex:UTheatre=new UTheatre();
  MUmovie:UMovie=new UMovie();
  MUlinkedmovie:TheatreMovieWithName=new TheatreMovieWithName();
  multiplexes:UTheatre[]=[];
  movies:UMovie[]=[];
  linkedMovies:TheatreMovieWithName[]=[];
  users:UserWithBookingCount[]=[];

  // Flags to check if data has been loaded
  multiplexesLoaded: boolean = false;
  moviesLoaded: boolean = false;
  linkedMoviesLoaded: boolean = false;
  usersLoaded: boolean = false;
  ngOnInit(): void {
   
    this.GetMovies();
    this.GetTheatres();
    this.GetLinkedMovies();
   this.GetUsers();
  }
  ngAfterViewChecked(): void {
    if (this.multiplexesLoaded) {
      this.initializeDataTable('#Table');
      this.multiplexesLoaded = false;
    }
    if (this.moviesLoaded) {
      this.initializeDataTable('#Table2');
      this.moviesLoaded = false;
    }
    if (this.linkedMoviesLoaded) {
      this.initializeDataTable('#Table3');
      this.linkedMoviesLoaded = false;
    }
    if (this.usersLoaded) {
      this.initializeDataTable('#Table4');
      this.usersLoaded = false;
    }
  }
  initializeDataTable(tableId: string): void {
    $(tableId).DataTable({
      retrieve: true,
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true
    });
  }
  LinkMUmultiplex(multiplex:UTheatre){
    this.MUmultiplex=multiplex;
  }
  LinkMUmovie(movie:UMovie){
    this.MUmovie=movie;
  }
  LinkMUlinkedmovie(linkedMovie:TheatreMovieWithName){
    this.MUlinkedmovie=linkedMovie;
  }
  UpdateMUmultiplex(){
    this.GetTheatres();
  }
  UpdateMUmovie(){
    this.GetMovies();
  }
  UpdateMUlinkedmovie(){
    this.GetLinkedMovies();
  }
  GetTheatres(){
    this.service.getAllTheaters().subscribe({
      next:(data: UTheatre[]) => {
        this.multiplexes = data;
        this.multiplexesLoaded=true;
      },
      error:(error) => {
        console.error('Error fetching theaters:', error);
      }
    });
  }
  GetMovies(){
    this.service.getAllMovies().subscribe({
      next:(data: UMovie[]) => {
        this.movies = data;
        this.moviesLoaded=true;
      },
      error:(error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }
  GetLinkedMovies(){
    this.service.getAllTheatreMovies().subscribe({
      next:(data: TheatreMovieWithName[]) => {
        this.linkedMovies = data;
        this.linkedMoviesLoaded=true;
      },
      error:(error) => {
        console.error('Error fetching theatre movies:', error);
      }
    });
  }
  GetUsers(){
    this.service.getAllUsers().subscribe({
      next:(data: UserWithBookingCount[]) => {
        this.users = data;
        this.usersLoaded=true;
      },
      error:(error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
