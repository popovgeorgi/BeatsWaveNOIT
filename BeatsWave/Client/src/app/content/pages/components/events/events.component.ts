import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { EventsConfigService } from '../../../../core/services/events-config.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, AfterViewInit {

    events: any = [];

    constructor(private loadingService: LoadingService,
                private eventsConfigService: EventsConfigService) { }

    ngOnInit() {
        this.initEvents();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    initEvents() {
        this.events = this.eventsConfigService.eventsList;
    }

}
