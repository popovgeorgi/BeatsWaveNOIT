import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAnalytics } from 'src/app/core/models/analytics/UserAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-total-user',
  templateUrl: './total-user.component.html'
})
export class TotalUserComponent implements OnInit {

  @Output() isReady = new EventEmitter<boolean>();
  totalUsers: number = 0;
  usersPerMonth: number[]
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartOptions = {};
  chartLegend = false;
  chartType = 'line';

  constructor(private analyticsService: AnalyticsService) {
    this.chartOptionsConfig();
  }

  ngOnInit() {
    this.fetchData()
      .pipe(
        tap((res: UserAnalytics) => {
          this.usersPerMonth = res.usersPerMonth;
          this.totalUsers = res.totalCount;
          this.chartDataConfig();
        }))
      .subscribe(() => {}, () => {}, () => {
        this.isReady.emit(true);
      });
  }

  private fetchData(): Observable<UserAnalytics> {
    return this.analyticsService.getUsersPerMonth();
  }

  chartOptionsConfig() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            min: 0,
            max: 85
          }
        }],
        xAxes: [{
          display: false
        }]
      },
      layout: {
        padding: 0,
        margin: 0
      }
    };
  }

  // This is static data replace with you data
  chartDataConfig() {
    this.chartData = [{
      label: 'Users',
      data: this.usersPerMonth,
      backgroundColor: '#f11717',
      borderColor: '#f11717',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}
