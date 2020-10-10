import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
