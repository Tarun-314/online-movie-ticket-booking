import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Cities: string[] = [];
  selectedCity: string = '';

  constructor(private dataServices: DataService) {
    this.Cities = dataServices.getCities();
    this.selectedCity=this.Cities[0];
  }

  ngOnInit(): void {}

  selectCity(city: string): void {
    this.selectedCity = city;
  }
}
