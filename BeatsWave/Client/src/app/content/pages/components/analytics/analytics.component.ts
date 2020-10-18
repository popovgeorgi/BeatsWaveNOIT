import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit, AfterViewInit {

    currentUser: User;

    constructor(private loadingService: LoadingService,
                private userService: UserService) { }

    ngOnInit() {
        this.fetchUser();
    }

    private fetchUser() {
        this.userService.getInfo().subscribe(user => {
            this.currentUser = user;
        })
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
