import { Injectable } from '@angular/core';

import { EventsConfig } from '../../config/events';

@Injectable({
    providedIn: 'root'
})
export class EventsConfigService {

    public eventsConfig: EventsConfig = new EventsConfig();

    constructor() { }

    get eventsList() {
        return this.eventsConfig.config.items;
    }

    getEventByIb(id) {
        return this.eventsList.find(event => event.id === id);
    }
}
