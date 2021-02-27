import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'listen';

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.authService.getToken();
    this.authService.autoLogin();
    this.localStorageService.setLocalStorage('themeSkin', {"theme":"dark","header":0,"sidebar":0,"player":0});
  }
}
