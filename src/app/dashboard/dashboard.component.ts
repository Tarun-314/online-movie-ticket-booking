import { Component, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { BookingDetails, TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';
import { DashboardService } from '../services/dashboard-services';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bookings, LinkedMovies, Movie, Multiplex, User } from '../models/data-model';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,AfterViewChecked, OnDestroy {
  
  constructor(private service:DashboardService){}
  
  Mmultiplex:UTheatre=new UTheatre();
  isMultiplexEmpty: boolean = true;
  Mmovie:UMovie=new UMovie();
  isMovieEmpty: boolean = true;
  Mlinkedmovie:TheatreMovieWithName=new TheatreMovieWithName();
  isLinkedMoveEmpty: boolean = true;
  multiplexes:UTheatre[]=[];
  movies:UMovie[]=[];
  linkedMovies:TheatreMovieWithName[]=[];
  users:UserWithBookingCount[]=[];
  BookingHistory:BookingDetails[]=[];
  // Flags to check if data has been loaded
  multiplexesLoaded: boolean = false;
  moviesLoaded: boolean = false;
  linkedMoviesLoaded: boolean = false;
  usersLoaded: boolean = false;
  bookingLoaded:boolean=false;


  toggleUserStatus(selectedUser:UserWithBookingCount): void {
    if (selectedUser.role=='User') {
      this.blockUser(selectedUser.userId);
      selectedUser.role="Block";
    } else {
      this.unblockUser(selectedUser.userId);
      selectedUser.role="User";
    }
  }


  MultiplexButtonClick() {
    if (this.isMultiplexEmpty) {
      this.addTheatre();
    } else {
      this.UpdateMmultiplex();
    }
  }
  MovieButtonClick() {
    if (this.isMovieEmpty) {
      this.addMovie();
    } else {
      this.UpdateMmovie();
    }
  }
  LinkedMovieButtonClick() {
    if (this.isLinkedMoveEmpty) {
      this.addTheatreMovie();
    } else {
      this.UpdateMlinkedmovie();
    }
  }
  ngOnInit(): void {   
    this.GetMovies();
    this.GetTheatres();
    this.GetLinkedMovies();
   this.GetUsers();
   this.GetBookings();
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
    if(this.bookingLoaded){
      this.initializeDataTable('#Table5');
      this.bookingLoaded=false;
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
  LinkMmultiplex(multiplex:UTheatre){
    this.Mmultiplex={...multiplex};
    this.isMultiplexEmpty=false;
  }
  LinkMmovie(movie:UMovie){
    this.Mmovie={...movie};
    this.isMovieEmpty=false;
  }
  LinkMlinkedmovie(linkedMovie:TheatreMovieWithName){
    this.Mlinkedmovie={...linkedMovie};
    this.isLinkedMoveEmpty=false;
  }
  UnLinkMmultiplex(){
    this.Mmultiplex=new UTheatre();
    this.isMultiplexEmpty=true;
  }
  UnLinkMmovie(){
    this.Mmovie=new UMovie();
    this.isMovieEmpty=true;
  }
  UnLinkMlinkedmovie(){
    this.Mlinkedmovie=new TheatreMovieWithName();
    this.isLinkedMoveEmpty=true;
  }
  UpdateMmultiplex(){
    this.service.updateTheatre(this.Mmultiplex).pipe(
      finalize(() => {
        this.GetTheatres();
        
      })
    ).subscribe({
      
      error:(msg)=>{

      }
    });
    
  }
  UpdateMmovie(){
    
    this.service.updateMovie(this.Mmovie).pipe(
      finalize(() => {
        this.GetMovies(); // This will always be executed
      })
    ).subscribe({
      next:(res)=>{
        
      },
      error:(msg)=>{
        
      }
    })
   
  }
  UpdateMlinkedmovie(){
    this.service.updateTheatreMovie(this.Mlinkedmovie).pipe(
      finalize(() => {
        this.GetLinkedMovies(); // This will always be executed
      })
    ).subscribe({
      error:(msg)=>{

      }
    })
    
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
  GetBookings() {
    this.service.getBookings().subscribe({
      next:(data: BookingDetails[]) => {
        this.BookingHistory = data;
        this.bookingLoaded=true;
      },
      error:(error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  DeleteMovie(movieId: string): void {
    alert("in delete function");
    this.service.deleteMovie(movieId).pipe(
      finalize(() => {
        this.GetMovies();
        
      })
    ).subscribe({
      next:(response:string) => {
      console.log('Movie deleted:', response);
     },error:(error) => {
      console.error('Error deleting movie:', error);
    }});
  }

  DeleteTheatre(theatreId: string): void {
    this.service.deleteTheatre(theatreId).pipe(
      finalize(() => {
        this.GetTheatres();
        
      })
    ).subscribe({
      next:(response:string) => {
      console.log('Theatre deleted:', response);
    }, error:(error) => {
      console.error('Error deleting theatre:', error);
    }});
  }

  DeleteTheatreMovie(theatreMovieId: string): void {
    this.service.deleteTheatreMovie(theatreMovieId).pipe(
      finalize(() => {
        this.GetLinkedMovies();
        
      })
    ).subscribe({
      next:(response:string) => {
      console.log('TheatreMovie deleted:', response);
    },error:(error) => {
      console.error('Error deleting TheatreMovie:', error);
    }});
  }
  addMovie(): void {
    this.service.insertMovie(this.Mmovie).pipe(
      finalize(() => {
        this.GetMovies();
        
      })
    ).subscribe({
      next: (response:string) => {
        console.log('Movie inserted:', response);
      },
      error: (err) => {
        console.error('Error inserting movie:', err);
      }
    });
  }

  addTheatre(): void {
    this.service.insertTheatre(this.Mmultiplex).pipe(
      finalize(() => {
        this.GetTheatres();
        
      })
    ).subscribe({
      next: (response:string) => {
        console.log('Theatre inserted:', response);
      },
      error: (err) => {
        console.error('Error inserting theatre:', err);
      }
    });
  }

  addTheatreMovie(): void {
    this.service.insertTheatreMovie(this.Mlinkedmovie).pipe(
      finalize(() => {
        this.GetLinkedMovies();
        
      })
    ).subscribe({
      next: (response:string) => {
        console.log('TheatreMovie inserted:', response);
      },
      error: (err) => {
        console.error('Error inserting TheatreMovie:', err);
      }
    });
  }
  blockUser(userId: string): void {
    this.service.blockUser(userId).subscribe({
      next: (response:any) => {
        console.log('User blocked:', response);
      },
      error: (err) => {
        console.error('Error blocking user:', err);
      }
    });
  }

  unblockUser(userId: string): void {
    this.service.unblockUser(userId).subscribe({
      next: (response:any) => {
        console.log('User unblocked:', response);
      },
      error: (err) => {
        console.error('Error unblocking user:', err);
      }
    });
  }

  deleteUser(userId: string): void {
    this.service.deleteUser(userId).subscribe({
      next: (response:string) => {
        console.log('User deleted:', response);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  ngOnDestroy(): void {
    $('.modal').modal('hide');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }  
}
