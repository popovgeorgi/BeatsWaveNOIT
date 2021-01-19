import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventPath = environment.apiUrl + '/events';
  constructor(private http: HttpClient) { }

  uploadEvent(data) {
    return this.http.post(this.eventPath, data);
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath);
  }

  getEvent(id): Observable<Event> {
    return this.http.get<Event>(this.eventPath + '/' + id);
  }

  getPremium(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath + '/HomepageListed');
  }
}
