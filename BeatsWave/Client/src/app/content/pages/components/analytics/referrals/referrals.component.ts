import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-referrals',
    templateUrl: './referrals.component.html'
})
export class ReferralsComponent implements OnInit {

    referrals = [];

    constructor() { }

    ngOnInit() {
        this.initReferrals();
    }

    initReferrals() {
        this.referrals = [
            {
                name: 'Facebook',
                data: 3421,
                barColorClass: 'bg-info',
                barWidth: 80
            },
            {
                name: 'Instagram',
                data: 2401,
                barColorClass: 'bg-brand',
                barWidth: 67
            },
            {
                name: 'Twitter',
                data: 975,
                barColorClass: 'bg-primary',
                barWidth: 31
            },
            {
                name: 'Affiliates',
                data: 1672,
                barColorClass: 'bg-warning',
                barWidth: 52
            }
        ];
    }

}
