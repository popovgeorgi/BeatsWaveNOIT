import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventPath = environment.apiUrl + '/events';
  constructor(private http: HttpClient) { }

  uploadEvent(data) {
    return this.http.post(this.eventPath, data);
  }
}
