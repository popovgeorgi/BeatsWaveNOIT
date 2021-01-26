import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

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
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {

  public isStatisticsLoaded: boolean = false;
  public isPurchasesLoaded: boolean = false;
  public isUsersLoaded: boolean = false;
  public isSongsLoaded: boolean = false;
  public totalEarnings: number;
  private userSub: Subscription;
  public currentUser: User;

  constructor(private spinner: NgxSpinnerService,
    private authService: AuthService,
    private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.fetchData().subscribe(res => {
      this.totalEarnings = res.totalEarnings;
    })
    this.userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;
    })


  }

  private fetchData(): Observable<TotalEarningsAnalytics> {
    return this.analyticsService.getTotalEarnings();
  }

  check(){
    if (this.isStatisticsLoaded && this.isPurchasesLoaded && this.isUsersLoaded && this.isSongsLoaded) {
      this.spinner.hide('routing');
    }
  }

  ngAfterViewInit() {
  }

  setUsers() {
    this.isUsersLoaded = true;
    this.check();
  }

  setSongs() {
    this.isSongsLoaded = true;
  }

  setPurchases() {
    this.isPurchasesLoaded = true;
  }

  setStatistics() {
    this.isStatisticsLoaded = true;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
