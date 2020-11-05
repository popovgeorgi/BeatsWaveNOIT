import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beat } from '../models/Beat';

@Injectable({
  providedIn: 'root'
})
export class BeatService {
  private beatPath = environment.apiUrl + '/beats';
  constructor(private http: HttpClient) { }

  uploadBeat(data) {
    return this.http.post(this.beatPath, data);
  }

  getBeats(count = null): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '?take=' + count);
  }

  getBeat(id): Observable<Beat> {
    return this.http.get<Beat>(this.beatPath + '/' + id);
  }
}
