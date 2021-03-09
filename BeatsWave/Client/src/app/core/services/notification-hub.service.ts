import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/Notification';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationHubService {

  constructor(private authService: AuthService) { }

  private hubConnection: signalR.HubConnection;
  resultReceived = new EventEmitter<Notification>();

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.notificationHubUrl, { accessTokenFactory: () => this.authService.getToken() })
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connection started');
      this.registerNotificationEvents();
    })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public registerNotificationEvents() {
    this.hubConnection.on("NewNotificationReceived", (notification: Notification) => {
      this.resultReceived.emit(notification);
    })
  }
}
