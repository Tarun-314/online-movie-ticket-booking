import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isForgotPassword: boolean = false;

  toggleView() {
    this.isForgotPassword = !this.isForgotPassword;
  }

  flipCard(direction: string) {
    const card = document.getElementById("card");
    if (card) {
      card.style.transform = direction === 'register' ? "rotateY(-180deg)" : "rotateY(0deg)";
    }
  }
}
