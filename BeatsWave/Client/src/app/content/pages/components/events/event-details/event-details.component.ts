import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { first, map, mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from 'src/app/core/models/Event';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent {

  eventId: number;
  eventDetails: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService
  ) {
    this.fetchData().subscribe((event) => {
      this.eventDetails = event;
    }, () => { }, () => {
      this.spinner.hide('routing');
    });
  }

  private fetchData(): Observable<Event> {
    return this.route.params
      .pipe(
        first(),
        map((params) => {
          const id = params["id"];
          return id;
        }),
        mergeMap((id) => this.eventService.getEvent(id)))
  }
}
