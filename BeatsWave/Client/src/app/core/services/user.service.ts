import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Beat } from '../models/Beat';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPath = environment.apiUrl + '/users';
  constructor(private http: HttpClient) { }

  getInfo(): Observable<User> {
    return this.http.get<User>(this.userPath + '/Info');
  }

  getFavourites(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.userPath + '/Favourites');
  }

  getFavouritesByIds(): Observable<Array<number>> {
    return this.http.get<Array<number>>(this.userPath + '/FavouritesByIds')
  }

  getAllEmails(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.userPath + '/AllEmails');
  }
}
