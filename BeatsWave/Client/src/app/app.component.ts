import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'listen';

  constructor(private ngxSpinnerService: NgxSpinnerService,
    private authService: AuthService) {
    this.ngxSpinnerService.show('routing')
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
