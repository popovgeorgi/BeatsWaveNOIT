import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { UsersPerMonth } from 'src/app/core/models/UsersPerMonth';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-total-user',
  templateUrl: './total-user.component.html'
})
export class TotalUserComponent implements OnInit, AfterViewInit {

  usersPerMonth: UsersPerMonth[]
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartOptions = {};
  chartLegend = false;
  chartType = 'line';

  constructor(private analyticsService: AnalyticsService) {
    this.chartOptionsConfig();
  }

  async ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.chartDataConfig();
  }

  private fetchData() {
    this.analyticsService.getUsersPerMonth()
      .subscribe(res => {
        this.usersPerMonth = res;
      })
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
    let data = this.fillMonthArray(this.usersPerMonth);
    this.chartData = [{
      label: 'Users',
      data: [data],
      backgroundColor: '#f11717',
      borderColor: '#f11717',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
