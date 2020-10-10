import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'listen';

    constructor(private loadingService: LoadingService) {
        this.loadingService.startLoading();
    }

    ngOnInit() {
    }
}
