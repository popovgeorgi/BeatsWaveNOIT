import { Component, OnInit } from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

    chartData: ChartDataSets[] = [];
    chartLabels: Label[] = [];
    chartColors: Color[] = [];
    chartOptions = {};
    chartLegend = false;
    chartType = 'bar';

    topCountries = [];

    constructor() {
        this.chartOptionsConfig();
    }

    ngOnInit() {
        this.chartDataConfig();
        this.topCountriesData();
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
            data: [65, 59, 42, 73, 56, 55, 40],
            backgroundColor: '#ad20d4',
            borderColor: 'transparent',
            borderWidth: 3,
            pointBorderWidth: 0,
            pointRadius: 0
        }];

        this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
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
