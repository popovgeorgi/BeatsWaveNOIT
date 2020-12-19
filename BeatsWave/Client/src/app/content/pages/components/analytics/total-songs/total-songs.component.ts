import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BeatsPerMonth } from 'src/app/core/models/BeatsPerMonth';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-total-songs',
  templateUrl: './total-songs.component.html'
})
export class TotalSongsComponent implements OnInit {

  beatsPerMonth: BeatsPerMonth[];
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartOptions = {};
  chartLegend = false;
  chartType = 'bar';

  constructor(private analyticsService: AnalyticsService) {
    this.chartOptionsConfig();
  }

  ngOnInit() {
    this.fetchData()
      .pipe(
        tap((res: BeatsPerMonth[]) => {
          this.beatsPerMonth = res;
          this.chartDataConfig();
        }))
      .subscribe()
  }

  private fetchData(): Observable<Array<BeatsPerMonth>> {
    return this.analyticsService.getBeatsPerMonth();
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

  // This is static data replace with you data
  chartDataConfig() {
    let data = this.fillMonthArray(this.beatsPerMonth);
    this.chartData = [{
      label: 'Songs',
      data: data,
      backgroundColor: '#00c746',
      borderColor: '#00c746',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  private fillMonthArray(beatsPerMonth: Array<BeatsPerMonth>) {
    let data: Array<number> = []
    beatsPerMonth.forEach((obj) => {
      switch (obj.month) {
        case '1': {
          data[0] = obj.beatsCount
          break;
        }
        case '2': {
          data[1] = obj.beatsCount
          break;
        }
        case '3': {
          data[2] = obj.beatsCount
          break;
        }
        case '4': {
          data[3] = obj.beatsCount
          break;
        }
        case '5': {
          data[4] = obj.beatsCount
          break;
        }
        case '6': {
          data[5] = obj.beatsCount
          break;
        }
        case '7': {
          data[6] = obj.beatsCount
          break;
        }
        case '8': {
          data[7] = obj.beatsCount
          break;
        }
        case '9': {
          data[8] = obj.beatsCount
          break;
        }
        case '10': {
          data[9] = obj.beatsCount
          break;
        }
        case '11': {
          data[10] = obj.beatsCount
          break;
        }
        case '12': {
          data[11] = obj.beatsCount
          break;
        }
      }
    })

    return data;
  }

}
