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


export class User {
  UserID: string;
  FullName: string;
  PasswordHash: string;
  Email: string;
  PhoneNumber: string;
  Bookings: string;
  SecurityQuestion?: string;
  SecurityAnswer?: string;
  Role: string;
  UpdatedAt: Date;

  constructor(
    UserID: string,
    FullName: string,
    PasswordHash: string,
    Email: string,
    PhoneNumber: string,
    Bookings: string,
    SecurityQuestion?: string,
    SecurityAnswer?: string,
    Role: string = 'User',
    UpdatedAt: Date = new Date()
  ) {
    this.UserID = UserID;
    this.FullName = FullName;
    this.PasswordHash = PasswordHash;
    this.Email = Email;
    this.PhoneNumber = PhoneNumber;
    this.Bookings = Bookings;
    this.SecurityQuestion = SecurityQuestion;
    this.SecurityAnswer = SecurityAnswer;
    this.Role = Role;
    this.UpdatedAt = UpdatedAt;
  }
}

export class PurchaseHistory {
  Movie: string;
  Multiplex: string;
  BookingDate: Date;
  ShowTime: string;
  Seats: string;
  Amount: string;
  TransactionID: string;
  PaymentMode: string;

  constructor(
    Movie: string,
    Multiplex: string,
    BookingDate: Date,
    ShowTime: string,
    Seats: string,
    Amount: string,
    TransactionID: string,
    PaymentMode: string
  ) {
    this.Movie = Movie;
    this.Multiplex = Multiplex;
    this.BookingDate = BookingDate;
    this.ShowTime = ShowTime;
    this.Seats = Seats;
    this.Amount = Amount;
    this.TransactionID = TransactionID;
    this.PaymentMode = PaymentMode;
  }
}


export class LinkedMovies {
  TheatreMovieID: string;
  TheatreID: string;
  TheatreName: string;
  MovieID: string;
  MovieName: string;
  ScreenNumber: number;
  ShowDate: Date;
  ShowTimes: string; 
  AvailableSeats: string;

  constructor(
    TheatreMovieID: string,
    TheatreID: string,
    TheatreName: string,
    MovieID: string,
    MovieName: string,
    ScreenNumber: number,
    ShowDate: Date,
    ShowTimes: string,
    AvailableSeats: string
  ) {
    this.TheatreMovieID = TheatreMovieID;
    this.TheatreID = TheatreID;
    this.TheatreName = TheatreName;
    this.MovieID = MovieID;
    this.MovieName = MovieName;
    this.ScreenNumber = ScreenNumber;
    this.ShowDate = ShowDate;
    this.ShowTimes = ShowTimes;
    this.AvailableSeats = AvailableSeats;
  }
}
