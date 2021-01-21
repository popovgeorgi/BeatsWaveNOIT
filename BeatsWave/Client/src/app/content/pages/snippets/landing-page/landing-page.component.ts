import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoginComponent } from '../../../layout/header/login/login.component';
import { EventsConfigService } from '../../../../core/services/events-config.service';
import { ArtistsConfigService } from '../../../../core/services/artists-config.service';
import { Config } from '../../../../config/config';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { forkJoin, Observable } from 'rxjs';
import { Event } from 'src/app/core/models/Event';
import { ArtistService } from 'src/app/core/services/artist.service';
import { Artist } from 'src/app/core/models/Artist';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  config: Config;
  brand: any = {};
  events: Event[];
  trendingArtists: Artist[];
  sliderConfig: any = {};

  constructor(private spinner: NgxSpinnerService,
    private simpleModalService: SimpleModalService,
    private eventService: EventService,
    private artistService: ArtistService) {
    this.config = new Config();
    this.brand = this.config.config.brand;
  }

  ngOnInit() {
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
}
