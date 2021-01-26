import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoginComponent } from '../../../layout/header/login/login.component';
import { Config } from '../../../../config/config';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/core/models/Event';
import { ArtistService } from 'src/app/core/services/artist.service';
import { Artist } from 'src/app/core/models/Artist';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { DOCUMENT } from '@angular/common';
import { RegisterComponent } from 'src/app/content/layout/header/register/register.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {

  userSubscription: Subscription;
  isUserLogged: boolean = false;
  config: Config;
  brand: any = {};
  events: Event[];
  trendingArtists: Artist[];
  sliderConfig: any = {};

  constructor(@Inject(DOCUMENT) private document: Document,
    private spinner: NgxSpinnerService,
    private simpleModalService: SimpleModalService,
    private eventService: EventService,
    private artistService: ArtistService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService) {
    this.config = new Config();
    this.brand = this.config.config.brand;
  }

  ngOnInit() {
    const themeSkin = this.localStorageService.getThemeSkin();
    if (themeSkin) {
      this.document.body.classList.add('theme-' + themeSkin.theme);
    }

    this.userSubscription = this.authService.user.subscribe(user => {
      if (user == undefined) {
        this.isUserLogged = false;
      }
      else {
        this.isUserLogged = true;
      }
    })

    forkJoin([this.fetchTrendingArtists(), this.fetchPremiumEvents()]).subscribe(results => {
      this.trendingArtists = results[0];
      this.events = results[1];
    })

    this.sliderConfig = {
      arrows: false,
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      speed: 1000,
      autoplay: true,
      // Breakpoints
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };
  }

  public redirectToHomePage() {
    this.router.navigate(['/home']);
  }

  private fetchPremiumEvents(): Observable<Array<Event>> {
    return this.eventService.getPremium();
  }

  private fetchTrendingArtists(): Observable<Array<Artist>> {
    return this.artistService.getTrendingArtists();
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }

  openLoginModal() {
    const modal = this.simpleModalService.addModal(LoginComponent, {})
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        } else {
        }
      });
  }

  openRegisterModal() {
    const modal = this.simpleModalService.addModal(RegisterComponent, {})
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        } else {
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
