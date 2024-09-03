import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isForgotPassword: boolean = false;
  securityQuestion: string ='';
  securityAnswer: string='';
  passwordMismatch = false;
  toggleView() {
    this.isForgotPassword = !this.isForgotPassword;
  }

  flipCard(direction: string) {
    const card = document.getElementById("card");
    if (card) {
      card.style.transform = direction === 'register' ? "rotateY(-180deg)" : "rotateY(0deg)";
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  checkPasswordMatch() {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (password && confirmPassword) {
      this.passwordMismatch = password !== confirmPassword;
    }
  }
}
