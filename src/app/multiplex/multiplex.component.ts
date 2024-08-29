import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-services';
import { Multiplex } from '../models/data-model';

@Component({
  selector: 'app-multiplex',
  templateUrl: './multiplex.component.html',
  styleUrl: './multiplex.component.css'
})
export class MultiplexComponent implements OnInit{

  multiplexes:Multiplex[] = [];
  searchMul='';

  constructor(private dataService:DataService)
  {}

  ngOnInit()
  {
    this.multiplexes = this.dataService.getMultiplexes();
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

  filterMultiplexes(): Multiplex[] {
    return this.multiplexes.filter(mul =>
      mul.Name.toLowerCase().startsWith(this.searchMul.toLowerCase())
    );
  }

}
