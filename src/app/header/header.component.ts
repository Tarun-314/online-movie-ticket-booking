import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { LoggedInUser, User } from '../models/data-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  Cities: string[] = [];
  selectedCity: string = '';
  user:LoggedInUser;
  citySubscription: Subscription;

  isAuthenticated:boolean =  false;
  mySub:Subscription;

  constructor(private dataService: DataService, private router:Router, private authService:AuthService) {
    this.Cities = dataService.getCities();
    this.selectedCity=this.Cities[0];
  }

  ngOnInit()
  {
    this.citySubscription = this.dataService.selectedCity$.subscribe(city => {
      this.selectedCity=city;
    });

    this.mySub = this.authService.userSub.subscribe
    (user => {
        this.isAuthenticated=!!user;
        if(!!user)
        {
            this.user=user; 
        }
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

  ngOnDestroy(): void {
    this.mySub.unsubscribe();
  }

  onLogout()
  {
    this.authService.logout();
    this.isAuthenticated=false;
  }
}
