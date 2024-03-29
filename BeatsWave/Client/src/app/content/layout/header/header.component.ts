import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SimpleModalService } from 'ngx-simple-modal';
import { LanguageComponent } from './language/language.component';
import { SearchService } from '../../../core/services/search.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { SkinService } from '../../../core/services/skin.service';
import { Config } from '../../../config/config';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Notification } from 'src/app/core/models/Notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('headerBackdrop', { static: false }) backdrop: ElementRef;
  headerClasses = 'bg-primary';

  public notifications: Array<Notification>;
  public unseenNotifications: number;
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
    private authService: AuthService,
    private notificationService: NotificationService) {
    this.language = {
      title: 'Language',
      image: './assets/images/svg/translate.svg'
    };
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;

      if (user) {
        this.notificationService.getNotifications().subscribe(notifications => {
          this.notifications = notifications;
          this.unseenNotifications = notifications.filter(n => n.isSeen == false).length;
        })
      }
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

  search(term: string): void {
    this.searchService.searchTerms.next(term);
  }

  showSearchResults() {
    this.document.body.classList.add(Config.classes.openSearch);
    if (this.backdrop) {
      this.backdrop.nativeElement.classList.add(Config.classes.show);
    }
  }

  hideSearchResults() {
    this.document.body.classList.remove(Config.classes.openSearch);
    if (this.backdrop) {
      this.backdrop.nativeElement.classList.remove(Config.classes.show);
    }
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
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.skinSubscription.unsubscribe();
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
