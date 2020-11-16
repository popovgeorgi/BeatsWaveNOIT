import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'listen';

    constructor(private loadingService: LoadingService, private router: Router, private ngxSpinnerService: NgxSpinnerService) {
        //this.loadingService.startLoading();
        this.ngxSpinnerService.show('routing')
    }

    ngOnInit() {
    }
}
