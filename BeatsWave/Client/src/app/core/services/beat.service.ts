import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeatService {
  private beatPath = environment.apiUrl + '/beats';
  constructor(private http: HttpClient) { }

  uploadBeat(data) {
    return this.http.post(this.beatPath, data);
  }
}
