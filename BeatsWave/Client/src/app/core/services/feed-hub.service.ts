import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedHubService {

  constructor() { }

  private hubConnection: signalR.HubConnection
  resultReceived = new EventEmitter<number>();

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.feedHubUrl)
      .build();

      this.hubConnection.start().then(() =>
      {
        console.log('Connection started');
        this.registerBeatEvents();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public registerBeatEvents() {
    this.hubConnection.on("NewBeatReceived", id => {
      this.resultReceived.emit(id);
    })
  }
}
