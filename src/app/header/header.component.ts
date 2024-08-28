import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeCityDropdown();
  }

  private initializeCityDropdown(): void {
    const cityDropdownButton = document.getElementById('cityDropdown') as HTMLElement;
    const cityDropdownItems = document.querySelectorAll('#cityDropdown + .dropdown-menu .dropdown-item') as NodeListOf<HTMLElement>;

    const defaultOptionText = 'New York';
    if (cityDropdownButton) {
      const iconElement = cityDropdownButton.querySelector('.fa-map-marker');
      const textNode = document.createTextNode(` ${defaultOptionText}`);
      cityDropdownButton.innerHTML = '';
      if (iconElement) {
        cityDropdownButton.appendChild(iconElement);
      }
      cityDropdownButton.appendChild(textNode);
    }

    cityDropdownItems.forEach(item => {
      item.addEventListener('click', function () {
        const selectedCity = this.textContent?.trim() || defaultOptionText;
        if (cityDropdownButton) {
          const iconElement = cityDropdownButton.querySelector('.fa-map-marker');
          const textNode = document.createTextNode(` ${selectedCity}`);
          cityDropdownButton.innerHTML = '';
          if (iconElement) {
            cityDropdownButton.appendChild(iconElement);
          }
          cityDropdownButton.appendChild(textNode);
        }
      });
    });
  }
}
