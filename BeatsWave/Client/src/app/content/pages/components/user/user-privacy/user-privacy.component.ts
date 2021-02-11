import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-privacy',
  templateUrl: './user-privacy.component.html',
  styles: ['h1 {text-align: center;}', 'h2 {text-align: center;}']
})
export class UserPrivacyComponent implements AfterViewInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
