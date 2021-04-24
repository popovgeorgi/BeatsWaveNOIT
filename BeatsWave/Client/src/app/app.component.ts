import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';

//declare gives Angular app access to ga function
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'listen';

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router,
    private translate: TranslateService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-JTQSH5Y2B6', { 'page_path': event.urlAfterRedirects });
      }
    })

    translate.addLangs(['en', 'bg']);
    let locale = localStorage.getItem('locale')
    if (locale) {
      translate.use(locale.match(/en|bg/) ? locale : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
    this.authService.getToken();
    this.authService.autoLogin();
    this.localStorageService.setLocalStorage('themeSkin', { "theme": "dark", "header": 0, "sidebar": 0, "player": 0 });
  }
}
