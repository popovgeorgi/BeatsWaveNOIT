import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html'
})
export class LanguageComponent extends SimpleModalComponent<any, any> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
