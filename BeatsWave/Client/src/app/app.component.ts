import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'listen';

  constructor(private ngxSpinnerService: NgxSpinnerService,
    private authService: AuthService,
    private cartService: CartService) {
    this.ngxSpinnerService.show('routing')
  }

  ngOnInit() {
    this.cartService.remove(11);
    this.cartService.getCurrentNumber();
    this.authService.autoLogin();
  }
}
