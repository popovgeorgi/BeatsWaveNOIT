import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html'
})
export class EventCardComponent implements OnInit {

    @Input() musicEvent: any = {};
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    constructor() { }

    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-h bg-img';
    }

}
