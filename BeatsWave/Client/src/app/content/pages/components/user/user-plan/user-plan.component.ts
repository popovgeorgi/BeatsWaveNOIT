import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
    selector: 'app-user-plan',
    templateUrl: './user-plan.component.html'
})
export class UserPlanComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
