import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReferalsAnalytics } from 'src/app/core/models/analytics/ReferalsAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html'
})
export class ReferralsComponent implements OnInit {

  @Output() isReady = new EventEmitter<boolean>();
  private totalReferalsCount: number = 0;
  referrals = [];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.fetchData()
      .pipe(
        tap((res: ReferalsAnalytics) => {
          this.totalReferalsCount = res.comments + res.followers + res.plays;
          this.initReferrals(res);
        })
      )
      .subscribe(() => { }, () => { }, () => {
        this.isReady.emit(true);
      })
  }

  private fetchData(): Observable<ReferalsAnalytics> {
    return this.analyticsService.getReferals();
  }

  initReferrals(res: ReferalsAnalytics) {
    this.referrals = [
      {
        name: 'Plays',
        data: res.plays,
        barColorClass: 'bg-info',
        barWidth: (res.plays / this.totalReferalsCount) * 100
      },
      {
        name: 'Comments',
        data: res.comments,
        barColorClass: 'bg-brand',
        barWidth: (res.comments / (res.comments + res.followers)) * 100
      },
      {
        name: 'Followers',
        data: res.followers,
        barColorClass: 'bg-primary',
        barWidth: (res.followers / (res.comments + res.followers)) * 100
      }
    ];
  }

}
