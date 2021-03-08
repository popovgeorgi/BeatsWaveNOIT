import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/core/models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent {

  @Input() data: Notification;

  constructor() { }
}
