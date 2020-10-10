import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../core/services/loading.service';
import { EventsConfigService } from '../../../../../core/services/events-config.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    eventId: number;
    eventDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private eventsConfigService: EventsConfigService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.eventId = parseInt(param.id, 10);
                this.getEventDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getEventDetails() {
        this.eventDetails = this.eventsConfigService.getEventByIb(this.eventId);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
