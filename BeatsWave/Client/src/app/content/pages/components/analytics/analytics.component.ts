import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnalyticsService } from 'src/app/core/services/analytics.service';
import { TotalEarningsAnalytics } from 'src/app/core/models/analytics/TotalEarningsAnalytics';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  public isStatisticsLoaded: boolean = false;
  public isLikesLoaded: boolean = false;
  public isUsersLoaded: boolean = false;
  public isSongsLoaded: boolean = false;
  public totalEarnings: number;
  private userSub: Subscription;
  public currentUser: User;

  constructor(private spinner: NgxSpinnerService,
    private authService: AuthService,
    private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;
    })
  }

  setUsers() {
    this.isUsersLoaded = true;
    this.check();
  }

  setSongs() {
    this.isSongsLoaded = true;
    this.check();
  }

  setLikes() {
    this.isLikesLoaded = true;
    this.check();
  }

  setStatistics() {
    this.isStatisticsLoaded = true;
    this.check();
  }

  private check() {
    if (this.isStatisticsLoaded && this.isLikesLoaded && this.isUsersLoaded && this.isSongsLoaded) {
      this.spinner.hide('routing');
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
