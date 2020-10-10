import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineTabsDirective } from './directives/line-tabs.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        LineTabsDirective
    ],
    exports: [
        LineTabsDirective
    ]
})
export class CoreModule { }
