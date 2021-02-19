import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {

    constructor(private router: Router) { }

    public goToFeed() {
      this.router.navigate(['/music']);
    }
}
