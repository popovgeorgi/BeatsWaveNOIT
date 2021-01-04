import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from 'src/app/core/models/Event';

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
