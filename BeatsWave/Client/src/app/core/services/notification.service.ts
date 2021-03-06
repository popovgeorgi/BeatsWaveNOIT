import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationPath = environment.apiUrl + '/notifications';
  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(this.notificationPath);
  }

  makeNotificationsSeen() {
    return this.http.put<any>(this.notificationPath, '');
  }
}
