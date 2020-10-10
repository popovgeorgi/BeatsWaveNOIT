import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
    selector: 'app-total-songs',
    templateUrl: './total-songs.component.html'
})
export class TotalSongsComponent implements OnInit {

    chartData: ChartDataSets[] = [];
    chartLabels: Label[] = [];
    chartColors: Color[] = [];
    chartOptions = {};
    chartLegend = false;
    chartType = 'bar';

    constructor() {
        this.chartOptionsConfig();
    }

    ngOnInit() {
        this.chartDataConfig();
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
        this.chartData = [{
            label: 'Songs',
            data: [65, 59, 42, 73, 56, 55, 40],
            backgroundColor: '#00c746',
            borderColor: '#00c746',
            borderWidth: 3,
            pointBorderWidth: 0,
            pointRadius: 0
        }];

        this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    }

}
