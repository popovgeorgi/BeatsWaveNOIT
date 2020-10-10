import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, AfterViewInit {

    settings: any;

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
        // This is static data just to display replace with your data
        this.settings = {
            emailNotification: true,
            messageNotification: true,
            streamingQuality: 'Very high',
            commonVolume: true,
            volumeLevel: 'Quiet',
            nightMode: false
        };
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
