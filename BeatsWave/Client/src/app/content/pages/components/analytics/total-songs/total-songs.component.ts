import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BeatAnalytics } from 'src/app/core/models/analytics/BeatAnalytics';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-total-songs',
  templateUrl: './total-songs.component.html'
})
export class TotalSongsComponent implements OnInit {

  @Output() isReady = new EventEmitter<boolean>();
  totalCount: number = 0;
  beatsPerMonth: number[];
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
        tap((res: BeatAnalytics) => {
          this.beatsPerMonth = res.beatsPerMonth;
          this.totalCount = res.totalCount;
          this.chartDataConfig();
        }))
      .subscribe(() => {}, () => {}, () => {
        this.isReady.emit(true);
      })
  }

  private fetchData(): Observable<BeatAnalytics> {
    return this.analyticsService.getUserBeatsPerMonth();
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
      label: 'Songs',
      data: this.beatsPerMonth,
      backgroundColor: '#00c746',
      borderColor: '#00c746',
      borderWidth: 3,
      pointBorderWidth: 0,
      pointRadius: 0
    }];

    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}
