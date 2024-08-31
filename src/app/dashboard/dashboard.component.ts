import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { LinkedMovies, Movie, Multiplex, User } from '../models/data-model';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  
  constructor(private dataService:DataService, private fb: FormBuilder){}

  multiplexes:Multiplex[]=[];
  movies:Movie[]=[];
  linkedMovies:LinkedMovies[]=[];
  users:User[]=[];
  linkMovieForm: FormGroup;

  ngOnInit(): void {
    this.multiplexes = this.dataService.getMultiplexes();
    this.movies = this.dataService.getMovies();
    this.linkedMovies = this.dataService.getLinkedMovies();
    this.users = this.dataService.getUsers();
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('#Table,#Table2,#Table3,#Table4,#Table5').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true
      });
    });
  }
}
