import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-secondary-card',
    templateUrl: './secondary-card.component.html'
})
export class SecondaryCardComponent implements OnInit {

    @Input() item: any = {};
    @Input() imageBorderRadiusClass = 'card-img--radius-md';

    constructor() { }

    ngOnInit() {
    }

}
