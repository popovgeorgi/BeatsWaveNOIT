import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html'
})
export class CountdownComponent implements OnInit {

    @Input() units: any;
    @Input() end: any;
    @Input() displayString = '';
    @Input() text: any;
    @Input() divider: any;
    @Input() showZero = false;
    @Output() reached: EventEmitter<Date> = new EventEmitter();
    display: any = [];
    displayNumbers: any = [];
    wasReached = false;

    constructor() {
      setInterval(() => this.countdown(), 100);
    }

    ngOnInit() {
    }

    countdown() {
        if (this.wasReached) {
            return false;
        }

        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }

        const givenDate: any = new Date(this.end);
        const now: any = new Date();
        const dateDifference: any = givenDate - now;

        if ((dateDifference < 100 && dateDifference > 0) || dateDifference < 0 && !this.wasReached) {
            this.wasReached = true;
            this.reached.next(now);
        }

        const lastUnit = this.units[this.units.length - 1];
        const  unitConstantForMilliSecs = {
            year: (((1000 * 60 * 60 * 24 * 7) * 4) * 12),
            month: ((1000 * 60 * 60 * 24 * 7) * 4),
            weeks: (1000 * 60 * 60 * 24 * 7),
            days: (1000 * 60 * 60 * 24),
            hours: (1000 * 60 * 60),
            minutes: (1000 * 60),
            seconds: 1000
        };
        const unitsLeft = {};
        let returnText = '';
        let returnNumbers = '';
        let totalMilliSecsLeft = dateDifference;
        let i;
        let unit;

        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {
                unit = this.units[i].trim();
                if (unitConstantForMilliSecs[unit.toLowerCase()] === false) {
                    throw new Error('Cannot repeat unit: ' + unit);
                }
                if (unitConstantForMilliSecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: year, month, weeks, ' +
                      'days, hours, minutes, seconds, milliseconds');
                }

                // If it was reached, everything is zero
                unitsLeft[unit] = (this.wasReached) ? 0 : totalMilliSecsLeft / unitConstantForMilliSecs[unit.toLowerCase()];

                if (lastUnit === unit) {
                  unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                } else {
                  unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }

                totalMilliSecsLeft -= unitsLeft[unit] * unitConstantForMilliSecs[unit.toLowerCase()];
                unitConstantForMilliSecs[unit.toLowerCase()] = false;

                // If it's less than 0, round to 0
                unitsLeft[unit] = (unitsLeft[unit] > 0) ? unitsLeft[unit] : 0;

                returnNumbers += ' ' + unitsLeft[unit] + ' | ';
                returnText += ' ' + unit;
            }
        }

        if (this.text === null || !this.text) {
            this.text = {
                Year: 'Year',
                Month: 'Month',
                Weeks: 'Weeks',
                Days: 'Days',
                Hours: 'Hours',
                Minutes: 'Minutes',
                Seconds: 'Seconds',
                MilliSeconds: 'Milliseconds'
            };
        }

        this.displayString = returnText
        .replace('Year', this.text.Year + ' | ')
        .replace('Month', this.text.Month + ' | ')
        .replace('Weeks', this.text.Weeks + ' | ')
        .replace('Days', this.text.Days + ' | ')
        .replace('Hours', this.text.Hours + ' | ')
        .replace('Minutes', this.text.Minutes + ' | ')
        .replace('Seconds', this.text.Seconds);

        this.displayNumbers = returnNumbers.split('|');
        this.display = this.displayString.split('|');
    }

}
