import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'listen';

    constructor(private spinner: NgxSpinnerService) {
        this.spinner.show('primary');
    }

    ngOnInit() {
    }
}
