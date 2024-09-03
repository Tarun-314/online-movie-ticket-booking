import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoggedInUser } from '../models/data-model';

export interface AuthResponseData {
  data: string;
  message: string;
  isSuccess: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  tokenExpiryTimer: any;

  userSub = new BehaviorSubject<LoggedInUser>(null);

  signup(fullName: string, passwordHash: string, email: string, phoneNumber: string, securityQuestion: string, securityAnswer: string) {
    return this.http
      .post<AuthResponseData>(
        'https://localhost:7263/Register',
        {
          fullName,
          passwordHash,
          email,
          phoneNumber,
          securityQuestion,
          securityAnswer
        }
      ).pipe(
        catchError(this.errorHandler),
        tap(respData => {
          this.authHandler(email, respData.data, respData.data, 3600); // Assuming token expiry is 1 hour
        })
      );
  }

  login(username: string, password: string, token: string) {
    return this.http
      .post<AuthResponseData>(
        'https://localhost:7263/login',
        {
          username,
          password,
          token
        }
      ).pipe(
        catchError(this.errorHandler),
        tap(respData => {
          this.authHandler(username, respData.data, respData.data, 3600); // Assuming token expiry is 1 hour
        })
      );
  }

  logout() {
    this.userSub.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpiryTimer) {
      clearTimeout(this.tokenExpiryTimer);
    }

    this.tokenExpiryTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new LoggedInUser(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));

    if (loadedUser.validToken) {
      const expireIn = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expireIn);
      this.userSub.next(loadedUser);
    }
  }

  autoLogout(expiryTimer: number) {
    this.tokenExpiryTimer = setTimeout(() => {
      this.logout();
    }, expiryTimer);
  }

  private authHandler(email: string, id: string, token: string, expireIn: number) {
    const expiryDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new LoggedInUser(email, id, token, expiryDate);
    this.userSub.next(user);
    this.autoLogout(expireIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(responseError: HttpErrorResponse) {
    let errorMsg = "An unexpected error occurred.";
    if (!responseError.error || !responseError.error.error) return throwError(errorMsg);

    switch (responseError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = "Entered email already exists.";
        break;
      case 'INVALID_CREDENTIALS':
        errorMsg = "Invalid credentials. Please try again.";
        break;
      case 'BLOCKED_USER':
        errorMsg = "User Blocked. Please contact administrator.";
        break;
      case 'REG_FAILED':
        errorMsg = "Bad Request. Please try again.";
        break;
    }
    return throwError(errorMsg);
  }
}
