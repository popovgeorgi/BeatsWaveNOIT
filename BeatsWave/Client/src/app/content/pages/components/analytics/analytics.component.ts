import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit, AfterViewInit {

    currentUser: any;

    constructor(private loadingService: LoadingService,
                private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.currentUser = this.localStorageService.getCurrentUser();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
