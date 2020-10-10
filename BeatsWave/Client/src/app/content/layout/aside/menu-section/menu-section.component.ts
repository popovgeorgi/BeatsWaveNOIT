import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-section',
    templateUrl: './menu-section.component.html'
})
export class MenuSectionComponent implements OnInit {

    @Input() menuItem: any = {};

    constructor() { }

    ngOnInit() {
    }

}
