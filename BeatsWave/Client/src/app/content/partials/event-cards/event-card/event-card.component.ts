import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/Event';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html'
})
export class EventCardComponent implements OnInit {

    @Input() musicEvent: Event;
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    constructor() { }

    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-h bg-img';
    }

}
