import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-countdown-card',
    templateUrl: './event-countdown-card.component.html'
})
export class EventCountdownCardComponent implements OnInit {

    @Input() musicEvent: any = {};
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    countText: any = {};

    constructor() { }

    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-v bg-img';

        this.countText = {
            Year: '',
            Month: '',
            Weeks: '',
            Days: '',
            Hours: '',
            Minutes: '',
            Seconds: '',
            MilliSeconds: ''
        };
    }

}
