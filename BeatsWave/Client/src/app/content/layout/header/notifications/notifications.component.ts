import { Component, Input } from '@angular/core';
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
    const unseenMessages = this.data.filter(n => n.isSeen == false).length;
    if (unseenMessages > 0) {
      this.unseen = 0;
      this.notificationService.makeNotificationsSeen().subscribe();
    }
  }
}
