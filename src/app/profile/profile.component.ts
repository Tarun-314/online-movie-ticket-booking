import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { BookingHistory, Bookings, DataTransferObject, IUser, LoggedInUser, User } from '../models/data-model';
import * as CryptoJS from 'crypto-js';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{


  constructor(private dataService:DataService){}
  user:IUser;
  user_purchase_history:BookingHistory[];

  ngOnInit()
  {
    this.GetUser();
    this.GetBookings();
  }

  GetBookings(){
    this.dataService.getUserPurchaseHistory().subscribe({
      next:(data:BookingHistory[])=>{
        this.user_purchase_history=data;
        console.log("booking history");
        this.DataTableInitiate();
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  UpdateUser() {
    this.user.passwordHash=CryptoJS.MD5(this.user.passwordHash).toString();
    this.dataService.setUserProfile(this.user).subscribe({
      next:(res:DataTransferObject)=>{
        console.log(res.message);
        this.user.passwordHash="";
      },error:(msg)=>{
        console.log(msg);
        this.user_purchase_history=[];
      }
    })
  }
  
  GetUser(){
    this.dataService.getUserProfile().subscribe({
      next:(user:IUser)=>{
        console.log(user.passwordHash);
        this.user=user;
        console.log(this.user);
        this.user.passwordHash="";
      },
      error:(msg)=>{
        console.log(msg);
      }
    });
  }
  DataTableInitiate(): void {
    $(document).ready(function() {
      $('#Table5').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true
      });
    });
  }
}
