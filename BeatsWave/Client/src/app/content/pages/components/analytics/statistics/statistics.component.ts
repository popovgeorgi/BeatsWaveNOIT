import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersPerMonth } from 'src/app/core/models/UsersPerMonth';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  usersPerMonth: UsersPerMonth[];
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
        tap((res: UsersPerMonth[]) => {
          this.usersPerMonth = res;
          this.chartDataConfig();
        })
      )
      .subscribe()
  }

  private fetchData(): Observable<Array<UsersPerMonth>> {
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
    let data = this.fillMonthArray(this.usersPerMonth);
    this.chartData = [{
      label: 'Statistics',
      data: data,
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

  private fillMonthArray(usersPerMonth: Array<UsersPerMonth>) {
    let data: Array<number> = []
    usersPerMonth.forEach((obj) => {
      switch (obj.month) {
        case '1': {
          data[0] = obj.usersCount
          break;
        }
        case '2': {
          data[1] = obj.usersCount
          break;
        }
        case '3': {
          data[2] = obj.usersCount
          break;
        }
        case '4': {
          data[3] = obj.usersCount
          break;
        }
        case '5': {
          data[4] = obj.usersCount
          break;
        }
        case '6': {
          data[5] = obj.usersCount
          break;
        }
        case '7': {
          data[6] = obj.usersCount
          break;
        }
        case '8': {
          data[7] = obj.usersCount
          break;
        }
        case '9': {
          data[8] = obj.usersCount
          break;
        }
        case '10': {
          data[9] = obj.usersCount
          break;
        }
        case '11': {
          data[10] = obj.usersCount
          break;
        }
        case '12': {
          data[11] = obj.usersCount
          break;
        }
      }
    })

    return data;
  }

}
