import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private followPath = environment.apiUrl + '/follows';
  constructor(private http: HttpClient) { }

  follow(id): Observable<any> {
    return this.http.post(this.followPath + '/follow', { userId: id });
  }

  unFollow(id): Observable<any> {
    return this.http.post(this.followPath + '/unfollow', { userId: id });
  }

  isArtistFollowedByCurrentUser(id): Observable<boolean> {
    return this.http.get<boolean>(this.followPath + '/' + id);
  }
}
