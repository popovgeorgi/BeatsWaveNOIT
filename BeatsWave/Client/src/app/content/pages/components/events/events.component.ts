import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { EventsConfigService } from '../../../../core/services/events-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, AfterViewInit {

    events: Event[] = [];

    constructor(private spinner: NgxSpinnerService,
                private eventService: EventService) { }

    ngOnInit() {
        this.fetchEvents();
    }

    fetchEvents() {
        this.eventService.getEvents().subscribe(events => {
          this.events = events;
        })
    }

    ngAfterViewInit() {
        this.spinner.hide('routing');
    }

}
