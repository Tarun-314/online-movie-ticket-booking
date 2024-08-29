import { model } from "@angular/core";

export class City{
    cities: string[];  
    constructor(array:string[]){
        this.cities=array;
    }
}

export class Multiplex {
    TheatreID: string;
    Name: string;
    Area: string;
    Location: string;
    Ratings: number;
    Screens: number;
    TotalSeats: number;
    Image: string;
    UpdatedAt: Date;
  
    constructor(
      TheatreID: string,
      Name: string,
      Area: string,
      Location: string,
      Ratings: number,
      Screens: number,
      TotalSeats: number,
      Image: string,
      UpdatedAt: Date = new Date()
    ) {
      this.TheatreID = TheatreID;
      this.Name = Name;
      this.Area = Area;
      this.Location = Location;
      this.Ratings = Ratings;
      this.Screens = Screens;
      this.TotalSeats = TotalSeats;
      this.Image = Image;
      this.UpdatedAt = UpdatedAt;
    }
  }
  

export class Movie {
  MovieID: string;
  Title: string;
  Genre: string;
  Duration: number;
  ReleaseDate: Date;
  Rating: number;
  Likes: number;
  Description: string;
  Casting: string;
  Trailer: string;
  Language: string;
  Image: string;
  UpdatedAt: Date;

  constructor(
    MovieID: string,
    Title: string,
    Genre: string,
    Duration: number,
    ReleaseDate: Date,
    Rating: number,
    Likes: number,
    Description: string,
    Casting: string,
    Trailer: string,
    Language: string,
    Image: string,
    UpdatedAt: Date = new Date()
  ) {
    this.MovieID = MovieID;
    this.Title = Title;
    this.Genre = Genre;
    this.Duration = Duration;
    this.ReleaseDate = ReleaseDate;
    this.Rating = Rating;
    this.Likes = Likes;
    this.Description = Description;
    this.Casting = Casting;
    this.Trailer = Trailer;
    this.Language = Language;
    this.Image = Image;
    this.UpdatedAt = UpdatedAt;
  }
}


export class Review {
  ReviewID?: string;
  UserID?: string;
  UserName: string;
  MovieID: string;
  Rating: number;
  Comment: string;
  ReviewDate: Date;

  constructor(
    ReviewID: string,
    UserID: string,
    UserName: string,
    MovieID: string,
    Rating: number,
    Comment: string,
    ReviewDate: Date
  ) {
    this.ReviewID = ReviewID;
    this.UserID = UserID;
    this.UserName = UserName;
    this.MovieID = MovieID;
    this.Rating = Rating;
    this.Comment = Comment;
    this.ReviewDate = ReviewDate;
  }
}
