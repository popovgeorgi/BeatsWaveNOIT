import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {

  private userSub: Subscription;
  public currentUser: User;

  constructor(private spinner: NgxSpinnerService,
    private authService: AuthService) { }

  ngOnInit() {
    var userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
