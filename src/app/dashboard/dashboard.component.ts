import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TheatreMovieWithName, UMovie, UTheatre, UserWithBookingCount } from '../models/dashboard-model';
import { DashboardService } from '../services/dashboard-services';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private service:DashboardService){}

  multiplexes:UTheatre[]=[];
  movies:UMovie[]=[];
  linkedMovies:TheatreMovieWithName[]=[];
  users:UserWithBookingCount[]=[];

  ngOnInit(): void {
    this.service.getAllTheaters().subscribe({
      next:(data: UTheatre[]) => {
        this.multiplexes = data;
      },
      error:(error) => {
        console.error('Error fetching theaters:', error);
      },
      complete:()=>{$(document).ready(function() {
        $('#Table').DataTable({
          retrieve: true,
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          lengthChange: true
        });
      });}
    });

    // Fetch all movies
    this.service.getAllMovies().subscribe({
      next:(data: UMovie[]) => {
        this.movies = data;
      },
      error:(error) => {
        console.error('Error fetching movies:', error);
      },
      complete:()=>{$(document).ready(function() {
        $('#Table2').DataTable({
          retrieve: true,
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          lengthChange: true
        });
      });}
    });

    // Fetch all theatre movies with names
    this.service.getAllTheatreMovies().subscribe({
      next:(data: TheatreMovieWithName[]) => {
        this.linkedMovies = data;
      },
      error:(error) => {
        console.error('Error fetching theatre movies:', error);
      },
      complete:()=>{$(document).ready(function() {
        $('#Table3').DataTable({
          retrieve: true,
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          lengthChange: true
        });
      });}
    });

    // Fetch all users with booking count
    this.service.getAllUsers().subscribe({
      next:(data: UserWithBookingCount[]) => {
        this.users = data;
      },
      error:(error) => {
        console.error('Error fetching users:', error);
      },
      complete:()=>{$(document).ready(function() {
        $('#Table4').DataTable({
          retrieve: true,
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          lengthChange: true
        });
      });}
    });
  }
  
}
