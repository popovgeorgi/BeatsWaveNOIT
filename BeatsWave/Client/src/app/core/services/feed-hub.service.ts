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
        this.registerBeatEvents();
      })
      .catch();
  }

  public stopConnection() {
    this.hubConnection.stop();
  }

  public registerBeatEvents() {
    this.hubConnection.on("NewBeatReceived", id => {
      this.resultReceived.emit(id);
    })
  }
}
