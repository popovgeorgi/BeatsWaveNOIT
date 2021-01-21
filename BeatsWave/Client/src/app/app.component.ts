import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private router: Router) {
    this.ngxSpinnerService.show('routing')
  }

  ngOnInit() {
    let result = this.authService.autoLogin();
    if (result == true) {
      this.router.navigate(['/home']);
    }
  }
}
