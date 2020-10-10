import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    public footerButtons: any = [
        {
            classes: 'btn btn-dark btn-air platform-btn',
            icon: 'ion-logo-android',
            subtitle: 'Android'
        },
        {
            classes: 'btn btn-danger btn-air platform-btn',
            icon: 'ion-logo-apple',
            subtitle: 'App Store'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
