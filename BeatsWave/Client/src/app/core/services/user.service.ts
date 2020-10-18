import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPath = environment.apiUrl + '/users';
  constructor(private http: HttpClient) { }

  getInfo(): Observable<User> {
    return this.http.get<User>(this.userPath);
  }
}
