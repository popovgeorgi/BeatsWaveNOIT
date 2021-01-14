import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.spinner.hide('routing');
  }
}
