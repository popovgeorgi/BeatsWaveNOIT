import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/core/models/Notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {

  @Input() data: Array<Notification>;
  @Input() unseen: number;

  constructor(private notificationService: NotificationService) {
  }

  public seeNotifications() {
    const unseenMessage = this.data.filter(n => n.isSeen == false).length;
    if (unseenMessage > 0) {
      this.notificationService.makeNotificationsSeen().subscribe();
    }
  }
}
