import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/core/models/Notification';
import { NotificationHubService } from 'src/app/core/services/notification-hub.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  @Input() data: Array<Notification>;
  @Input() unseen: number;

  constructor(
    private notificationService: NotificationService,
    private notificationHubService: NotificationHubService) { }

  ngOnInit() {
    this.notificationHubService.startConnection();
    this.notificationHubService.resultReceived.subscribe(notification => {
      this.unseen++;
      this.data.unshift(notification);
    })
  }

  public seeNotifications() {
    const unseenMessages = this.data.filter(n => n.isSeen == false).length;
    if (unseenMessages > 0) {
      this.unseen = 0;
      this.notificationService.makeNotificationsSeen().subscribe();
    }
  }
}
