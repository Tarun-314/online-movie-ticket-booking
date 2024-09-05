import { Component, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { BookingDetails, TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';
import { DashboardService } from '../services/dashboard-services';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bookings, DataTransferObject, LinkedMovies, Movie, Multiplex, User } from '../models/data-model';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,AfterViewChecked, OnDestroy {
  crudMessage: string = '';
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
  tableName:string='';

  private showCrudModal(message: string,name: string): void {
    this.crudMessage = message;
    this.tableName = name;
    $('.toast').toast('show');
    $('.toast-backdrop').show();

    $('.toast').on('hidden.bs.toast', function () {
      $('.toast-backdrop').hide();
    });
  }

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
        this.showCrudModal('Multiplex updated successfully','Multiplex List');
      })
    ).subscribe({
      next:(response:DataTransferObject)=>{

      },
      error:(msg)=>{
        this.showCrudModal('Failed to update multiplex','Multiplex List');
      }
    });
    
  }
  UpdateMmovie(){
    
    this.service.updateMovie(this.Mmovie).pipe(
      finalize(() => {
        this.GetMovies(); // This will always be executed
        this.showCrudModal('Updated movie Details','Movie List');
      })
    ).subscribe({
      next:(response:DataTransferObject)=>{
      },
      error:(msg)=>{
        this.showCrudModal('Failed to update Movie','Movie List');
      }
    })
   
  }
  UpdateMlinkedmovie(){
    this.service.updateTheatreMovie(this.Mlinkedmovie).pipe(
      finalize(() => {
        this.GetLinkedMovies(); // This will always be executed
        this.showCrudModal('Updated Linked Movies Table','Linked Movies');
      })
    ).subscribe({
      next:(response:DataTransferObject)=>{

      },
      error:(msg)=>{
        this.showCrudModal('Error while updating Details','Linked Movies');
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
      next:(response:DataTransferObject) => {
      console.log('Movie deleted:', response);
      this.showCrudModal('Successfully Deleted Movie','Movie List');
     },error:(error) => {
      this.showCrudModal('Error occured while deleting Movie','Movie List');
    }});
  }

  DeleteTheatre(theatreId: string): void {
    this.service.deleteTheatre(theatreId).pipe(
      finalize(() => {
        this.GetTheatres();
      })
    ).subscribe({
      next:(response:DataTransferObject) => {
      console.log('Theatre deleted:', response);
      this.showCrudModal('Successfully Deleted Theatre','Multiplex List');
    }, error:(error) => {
      this.showCrudModal('Error occured while deleting Theatre','Multiplex List');
    }});
  }

  DeleteTheatreMovie(theatreMovieId: string): void {
    this.service.deleteTheatreMovie(theatreMovieId).pipe(
      finalize(() => {
        this.GetLinkedMovies();
        
      })
    ).subscribe({
      next:(response:DataTransferObject) => {
      console.log('TheatreMovie deleted:', response);
      this.showCrudModal('Successfully Deleted TheatreMovie','Linked Movies');
    },error:(error) => {
      this.showCrudModal('Error occured while deleting TheatreMovie','Linked Movies');
    }});
  }
  addMovie(): void {
    this.service.insertMovie(this.Mmovie).pipe(
      finalize(() => {
        this.GetMovies();
        
      })
    ).subscribe({
      next: (response:DataTransferObject) => {
        console.log('Movie inserted:', response);
        this.showCrudModal('Added Movie Successfully','Movie List');
      },
      error: (err) => {
        this.showCrudModal('Error occured while adding movie','Movie List');
      }
    });
  }

  addTheatre(): void {
    this.service.insertTheatre(this.Mmultiplex).pipe(
      finalize(() => {
        this.GetTheatres();
        
      })
    ).subscribe({
      next: (response:DataTransferObject) => {
        console.log('Theatre inserted:', response);
        this.showCrudModal('Added Theatre Successfully','Multiplex List');
      },
      error: (err) => {
        this.showCrudModal('Error occured while adding Theatre','Multiplex List');;
      }
    });
  }

  addTheatreMovie(): void {
    this.service.insertTheatreMovie(this.Mlinkedmovie).pipe(
      finalize(() => {
        this.GetLinkedMovies();
        
      })
    ).subscribe({
      next: (response:DataTransferObject) => {
        console.log('TheatreMovie inserted:', response);
        this.showCrudModal('Linked Movie to Theatre Successfully','Linked Movies');
      },
      error: (err) => {
        this.showCrudModal('Error occured while Linking','Linked Movies');
      }
    });
  }
  blockUser(userId: string): void {
    this.service.blockUser(userId).subscribe({
      next: (response:DataTransferObject) => {
        console.log('User blocked:', response);
        this.showCrudModal('Blocked User Successfully','Users');
      },
      error: (err) => {
        this.showCrudModal('Failed to Block User','Users');
      }
    });
  }

  unblockUser(userId: string): void {
    this.service.unblockUser(userId).subscribe({
      next: (response:DataTransferObject) => {
        console.log('User unblocked:', response);
        this.showCrudModal('UnBlocked User Successfully','Users');
      },
      error: (err) => {
        this.showCrudModal('Failed to UnBlock User','Users');
      }
    });
  }

  deleteUser(userId: string): void {
    this.service.deleteUser(userId).subscribe({
      next: (response:DataTransferObject) => {
        console.log('User deleted:', response);
        this.showCrudModal('Deleted User','Users');
      },
      error: (err) => {
        this.showCrudModal('Failed to Delete User','Users');
      }
    });
  }

  ngOnDestroy(): void {
    $('.modal').modal('hide');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }  
}