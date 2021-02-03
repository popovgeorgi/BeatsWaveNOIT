import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CountryAnalytics } from 'src/app/core/models/analytics/CountryAnalytics';
import { UserAnalytics } from 'src/app/core/models/analytics/UserAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  @Output() isReady = new EventEmitter<boolean>();
  usersPerMonth: number[];
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartOptions = {};
  chartLegend = false;
  chartType = 'bar';

  topCountries: Array<CountryAnalytics>;

  constructor(private analyticsService: AnalyticsService) {
    this.chartOptionsConfig();
  }

  ngOnInit() {
    forkJoin([this.fetchData(), this.fetchTopCountries()])
      .pipe(
        tap((res) => {
          this.usersPerMonth = res[0].usersPerMonth;
          this.chartDataConfig();
        })
      )
      .subscribe(res => {
        this.topCountries = res[1];
      }, () => { }, () => {
        this.isReady.emit(true);
      })
  }

  private fetchData(): Observable<UserAnalytics> {
    return this.analyticsService.getDistinctUsers();
  }

  private fetchTopCountries(): Observable<Array<CountryAnalytics>> {
    return this.analyticsService.getListenersByCountry();
  }

  private chartOptionsConfig() {
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
  private chartDataConfig() {
    this.chartData = [{
      label: 'Statistics',
      data: this.usersPerMonth,
      backgroundColor: '#ad20d4',
      borderColor: 'transparent',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
}
