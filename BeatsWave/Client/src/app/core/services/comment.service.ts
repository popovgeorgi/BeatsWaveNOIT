import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentPath = environment.apiUrl + '/comments';
  constructor(private http: HttpClient) { }

  comment(data): Observable<any> {
    return this.http.post(this.commentPath, data);
  }

  getBeat(id): Observable<Array<Comment>> {
    if (id) {
      return this.http.get<Array<Comment>>(this.commentPath + '/' + id);
    }
    return of(null);
  }
}
