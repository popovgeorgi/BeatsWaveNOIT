import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SimpleModalService } from 'ngx-simple-modal';
import { LanguageComponent } from './language/language.component';
import { SearchService } from '../../../core/services/search.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { SkinService } from '../../../core/services/skin.service';
import { Config } from '../../../config/config';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('headerBackdrop', { static: false }) backdrop: ElementRef;
  headerClasses = 'bg-primary';

  private userSub: Subscription;
  language: any = {};
  currentUser: User;

  searchSubscription: Subscription;
  skinSubscription: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document,
    private searchService: SearchService,
    private simpleModalService: SimpleModalService,
    private localStorageService: LocalStorageService,
    private skinService: SkinService,
    private authService: AuthService) {
    this.language = {
      title: 'Language',
      image: './assets/images/svg/translate.svg'
    };
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;
    });
    const themeSkin = this.localStorageService.getThemeSkin();
    if (themeSkin) {
      this.headerClasses = 'bg-' + Config.THEME_CLASSES[themeSkin.header];
    }

    this.searchSubscription = this.searchService.searchStatus.subscribe((value) => {
      if (value) {
        this.hideSearchResults();
      }
    });
    this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
      if (skin) {
        this.headerClasses = 'bg-' + Config.THEME_CLASSES[skin.header];
      }
    });
  }

  showSearchResults() {
    this.document.body.classList.add(Config.classes.openSearch);
    this.backdrop.nativeElement.classList.add(Config.classes.show);
  }

  hideSearchResults() {
    this.document.body.classList.remove(Config.classes.openSearch);
    this.backdrop.nativeElement.classList.remove(Config.classes.show);
  }

  openLanguagesModal() {
    this.hideSearchResults();
    const modal = this.simpleModalService.addModal(LanguageComponent, {})
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        } else {
        }
      });
  }

  openSidebar() {
    this.document.body.classList.add(Config.classes.openSidebar);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.skinSubscription.unsubscribe();
    this.userSub.unsubscribe();
  }

}
