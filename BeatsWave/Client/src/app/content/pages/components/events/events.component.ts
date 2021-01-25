import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from 'src/app/core/models/Event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  allEvents: Event[];
  events: Event[] = [];

  constructor(private spinner: NgxSpinnerService,
    private eventService: EventService) { }

  ngOnInit() {
    this.fetchEvents()
      .subscribe(events => {
        this.allEvents = events;
        this.events = events.filter(e => e.isExpired == false);
      }, () => {}, () => {
        this.spinner.hide('routing');
      });
  }

  onSelect(event) {
    let option = event.target.value;
    if (option == 0) {
      this.events = this.events.filter(e => e.isExpired == false);
    }
    else if (option == 1) {
      this.events = this.allEvents;
    }
  }

  fetchEvents(): Observable<Array<Event>> {
    return this.eventService.getEvents();
  }
}
