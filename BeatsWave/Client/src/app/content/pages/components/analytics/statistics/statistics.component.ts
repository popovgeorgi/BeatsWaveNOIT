import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAnalytics } from 'src/app/core/models/analytics/UserAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  usersPerMonth: number[];
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartOptions = {};
  chartLegend = false;
  chartType = 'bar';

  topCountries = [];

  constructor(private analyticsService: AnalyticsService) {
    this.chartOptionsConfig();
  }

  ngOnInit() {
    this.topCountriesData();
    this.fetchData()
      .pipe(
        tap((res: UserAnalytics) => {
          this.usersPerMonth = res.usersPerMonth;
          this.chartDataConfig();
        })
      )
      .subscribe()
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
            max: 80
          }
        }],
        xAxes: [{
          barPercentage: 0.3
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
      label: 'Statistics',
      data: this.usersPerMonth,
      backgroundColor: '#ad20d4',
      borderColor: 'transparent',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  topCountriesData() {
    this.topCountries = [
      {
        name: 'USA',
        data: '1,243'
      },
      {
        name: 'UK',
        data: '643'
      },
      {
        name: 'Russia',
        data: '351'
      }
    ];
  }
}
