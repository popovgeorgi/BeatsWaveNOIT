import { AfterViewInit, Component, OnInit } from '@angular/core';

import { RadioConfigService } from '../../../../core/services/radio-config.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit, AfterViewInit {

    liveRadio: any = {};
    radio: any = {};

    constructor(private loadingService: LoadingService,
                private radioConfigService: RadioConfigService) { }

    ngOnInit() {
        this.initLiveRadio();
        this.initRadio();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize live radio object for section
    initLiveRadio() {
        this.liveRadio = {
            title: 'Live Frequency',
            subTitle: 'Tune in live now',
            items: this.radioConfigService.radioList
        };
    }

    // Initialize radio object for section
    initRadio() {
        this.radio = {
            title: 'Radio',
            subTitle: 'Select your best radio',
            items: this.radioConfigService.radioList
        };
    }

}
