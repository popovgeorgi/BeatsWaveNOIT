import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
