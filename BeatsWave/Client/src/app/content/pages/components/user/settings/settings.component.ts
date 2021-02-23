import { Component, OnInit } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  settings: any;

  constructor(private spinner: NgxSpinnerService,
    private userService: UserService,
    private snotifyService: SnotifyService) {
    this.snotifyService.config = ToastDefaults;
  }

  ngOnInit() {
    this.fetchData().subscribe(res => {
      this.settings.emailNotification = res;
    }, () => { }, () => {
      this.spinner.hide('routing');
    })
    this.settings = {
      emailNotification: true,
      streamingQuality: 'Very high'
    };
  }

  public changeEmailNotifications() {
    this.settings.emailNotification = !this.settings.emailNotification;
    this.userService.changeEmailNotification().subscribe(() => { }, () => { }, () => {
      this.snotifyService.info('You have changed your email notification behaviour', '', {
        showProgressBar: false
      });
    });
  }

  private fetchData(): Observable<string> {
    return this.userService.getIfUserWantsToReceiveEmails();
  }
}
