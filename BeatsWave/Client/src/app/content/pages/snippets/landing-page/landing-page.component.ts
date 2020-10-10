import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoginComponent } from '../../../layout/header/login/login.component';
import { EventsConfigService } from '../../../../core/services/events-config.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { ArtistsConfigService } from '../../../../core/services/artists-config.service';
import { Config } from '../../../../config/config';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit, AfterViewInit {

    config: Config;
    brand: any = {};
    events: any = [];
    trendingArtists: any = [];
    sliderConfig: any = {};

    constructor(private loadingService: LoadingService,
                private simpleModalService: SimpleModalService,
                private eventsConfigService: EventsConfigService,
                private artistsConfigService: ArtistsConfigService) {
        this.config = new Config();
        this.brand = this.config.config.brand;
    }

    ngOnInit() {
        this.initEvents();
        this.initTrendingArtists();

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

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    initEvents() {
        this.events = this.eventsConfigService.eventsList;
        this.events.splice(3, 1);
    }

    initTrendingArtists() {
        this.trendingArtists = this.artistsConfigService.artistsList;
        this.trendingArtists.splice(6, 2);
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
