import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { map, mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from 'src/app/core/models/Event';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements AfterViewInit {

  eventId: number;
  eventDetails: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService
  ) {
    this.fetchData();
  }

  private fetchData() {
    this.route.params
      .pipe(map((params) => {
        const id = params["id"];
        return id;
      }),
      mergeMap((id) => this.eventService.getEvent(id))).subscribe((event) => {
        this.eventDetails = event;
      })
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
