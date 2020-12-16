import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersPerMonth } from '../models/UsersPerMonth';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private usersPath = environment.apiUrl + '/users';
  constructor(private http: HttpClient) { }

  getUsersPerMonth(): Observable<Array<UsersPerMonth>> {
    return this.http.get<Array<UsersPerMonth>>(this.usersPath + '/UsersCountByMonths');
  }
}
