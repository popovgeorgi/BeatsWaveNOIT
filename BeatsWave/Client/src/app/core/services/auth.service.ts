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
    this.user.next(null);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
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

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
