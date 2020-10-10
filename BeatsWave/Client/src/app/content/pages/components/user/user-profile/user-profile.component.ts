import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    userProfile: any;

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
        // This is static data just to display replace with your data
        this.userProfile = {
            image: './assets/images/users/thumb.jpg',
            name: 'Halo Admin',
            firstName: 'Halo',
            lastName: 'Admin',
            userRole: 'Admin',
            location: 'USA',
            description: ''
        };
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
