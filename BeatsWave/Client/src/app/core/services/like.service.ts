import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likePath = environment.apiUrl + '/likes';
  constructor(private http: HttpClient) { }

  vote(beatId): Observable<boolean> {
    return this.http.post<boolean>(this.likePath, {"beatId": beatId})
  }

  doesUserLike(beatId): Observable<boolean> {
    return this.http.get<boolean>(this.likePath + '/' + beatId);
  }
}
