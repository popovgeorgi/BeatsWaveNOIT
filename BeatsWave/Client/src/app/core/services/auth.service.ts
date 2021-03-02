import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);

  private loginPath = environment.apiUrl + '/identity/login';
  private registerPath = environment.apiUrl + '/identity/register';

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post<any>(this.loginPath, data)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('userData', JSON.stringify(user));
          this.user.next(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('userData');
    this.deleteToken();
    this.user.next(null);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (this.tokenExpired(this.getToken())) {
      this.logout();
      return;
    }

    this.user.next(userData);
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    if (localStorage.getItem('userData') != null) {
      return JSON.parse(localStorage.getItem('userData')).id;
    }
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
