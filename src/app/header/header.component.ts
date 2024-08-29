import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { User } from '../models/data-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Cities: string[] = [];
  selectedCity: string = '';
  user:User;

  constructor(private dataServices: DataService, private router:Router) {
    this.Cities = dataServices.getCities();
    this.selectedCity=this.Cities[0];
    try{
      this.user=this.dataServices.getUserDetails();
    }
    catch(e)
    {
      this.router.navigate(['/error']);
    }
  }

  ngOnInit(): void {}

  selectCity(city: string): void {
    this.selectedCity = city;
    this.dataServices.setCity(this.selectedCity);
  }
}
