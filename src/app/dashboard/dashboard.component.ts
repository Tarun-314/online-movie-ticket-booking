import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data-services';
import { LinkedMovies, Movie, Multiplex, User } from '../models/data-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bookings, LinkedMovies, Movie, Multiplex, User } from '../models/data-model';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {
  
  constructor(private dataService:DataService, private fb: FormBuilder){}

  multiplexes:Multiplex[]=[];
  movies:Movie[]=[];
  linkedMovies:LinkedMovies[]=[];
  users:User[]=[];
  linkMovieForm: FormGroup;
  user_purchase_history:Bookings[];

  ngOnInit(): void {
    this.multiplexes = this.dataService.getMultiplexes();
    this.movies = this.dataService.getMovies();
    this.linkedMovies = this.dataService.getLinkedMovies();
    this.users = this.dataService.getUsers();
    this.user_purchase_history = this.dataService.getAllUsersHistory();
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('#Table,#Table2,#Table3,#Table4,#Table5,#Table6').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true
      });
    });
  }

  ngOnDestroy(): void {
    $('.modal').modal('hide');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }  
}
