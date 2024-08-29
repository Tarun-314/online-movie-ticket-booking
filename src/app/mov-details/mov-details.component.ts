import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Movie, Review } from '../models/data-model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from '../services/data-services';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-mov-details',
  templateUrl: './mov-details.component.html',
  styleUrls: ['./mov-details.component.css']
})
export class MovDetailsComponent implements OnInit, AfterViewInit {

  id:string;
  movie:Movie;
  isMovPresent:boolean = false;

  reviews:Review[];
  rating=3;
  comment='';
  username:string='loggedin_User';
  msg='';
  @ViewChild('f') rform:NgForm;

  constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService){}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.movie = this.dataService.getMovieById(this.id);
        this.reviews = this.dataService.getReviews(this.id);

        if(this.movie)
          this.isMovPresent=true;
        else
          this.router.navigate(['/error']);
      } else {
        this.router.navigate(['/error']);
      }
    });    

  }

  ngAfterViewInit() {
    $('#trailerModal').on('hide.bs.modal', function () {
      const videoSrc = $('#trailerVideo').attr('src');
      $('#trailerVideo').attr('src', '');
      $('#trailerVideo').attr('src', videoSrc);
    });
  }

  onSubmit() {
    try {
      // Add the review
      this.dataService.addReview({
        ReviewID: '',
        UserID: '',
        UserName: this.username,
        MovieID: this.movie.MovieID,
        Rating: this.rating,
        Comment: this.comment,
        ReviewDate: new Date()
      });
  
      this.msg = 'Review added successfully!';
      
      this.reviews = this.dataService.getReviews(this.movie.MovieID);
      
      this.rating = 3;
      this.comment = '';
      this.rform.reset();
    } catch (e) {
      // Handle the error
      this.msg = `Error: ${e.message}`;
    }
  }
  

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('fa-star'),
      ...Array(halfStar).fill('fa-star-half-o'),
      ...Array(emptyStars).fill('fa-star-o')
    ];
  }
}
