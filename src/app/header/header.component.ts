import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { User } from '../models/data-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Cities: string[] = [];
  selectedCity: string = '';
  user:User;
  citySubscription: Subscription;

  constructor(private dataService: DataService, private router:Router) {
    this.Cities = dataService.getCities();
    this.selectedCity=this.Cities[0];
    try{
      this.user=this.dataService.getUserDetails();
    }
    catch(e)
    {
      this.router.navigate(['/error']);
    }
  }

  ngOnInit()
  {
    this.citySubscription = this.dataService.selectedCity$.subscribe(city => {
      this.selectedCity=city;
    });
  }

  selectCity(city: string): void {
    this.selectedCity = city;
    this.dataService.setCity(this.selectedCity);

    const currentRoute = this.router.url;
    if (currentRoute.includes('/mul-details')) {
      this.router.navigate(['/home']);
    } else {
      
    }
  }
}
