import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LikeAnalytics } from 'src/app/core/models/analytics/LikeAnalytics';
import { PurchasesAnalytics } from 'src/app/core/models/analytics/PurchasesAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html'
})
export class PurchasesComponent implements OnInit {

  @Output() isReady = new EventEmitter<boolean>();
  totalLikes: number;
  likesPerMonth: number[];
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
        tap((res: LikeAnalytics) => {
          this.likesPerMonth = res.likesPerMonth;
          this.totalLikes = res.totalCount;
          this.chartDataConfig();
        })
      )
      .subscribe(() => {}, () => {}, () => {
        this.isReady.emit(true);
      });
  }

  private fetchData(): Observable<LikeAnalytics> {
    return this.analyticsService.getUserLikesPerMonth();
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
          display: false,
          barPercentage: 0.5
        }]
      },
      layout: {
        padding: 0,
        margin: 0
      }
    };
  }

  chartDataConfig() {
    this.chartData = [{
      label: 'Purchases',
      data: this.likesPerMonth,
      backgroundColor: 'transparent',
      borderColor: '#222629',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}
