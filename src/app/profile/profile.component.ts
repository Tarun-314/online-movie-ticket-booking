import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { Bookings, LoggedInUser, User } from '../models/data-model';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private dataService:DataService){}
  user:LoggedInUser;
  user_purchase_history:Bookings[];

  ngOnInit()
  {
    this.user = this.dataService.getUserDetails();
    //this.user_purchase_history=this.dataService.getUserPurchaseHistory();
    //const passwordHash = CryptoJS.MD5(form.value.password).toString();
  }

  ngAfterViewInit(): void {
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
