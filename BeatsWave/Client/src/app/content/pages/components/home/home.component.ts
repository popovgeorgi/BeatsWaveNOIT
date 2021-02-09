import { Component, OnInit } from '@angular/core';

import { GenresConfigService } from '../../../../core/services/genres-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeatService } from 'src/app/core/services/beat.service';
import { ArtistService } from 'src/app/core/services/artist.service';
import { Beat } from 'src/app/core/models/Beat';
import { forkJoin, Observable } from 'rxjs';
import { Event } from 'src/app/core/models/Event';
import { EventService } from 'src/app/core/services/event.service';
import { Artist } from 'src/app/core/models/Artist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  carouselArrowPosClass1 = 'arrow-pos-1';
  carouselArrowPosClass2 = 'arrow-pos-2';
  carouselArrowPosClass3 = 'arrow-pos-3';

  topCharts: any = null;
  newRelease: any = null;
  artists: any = null;
  genres: any = null;

  public trendingBeats: Beat[];
  public newReleases: Beat[];
  public featuredBeats: Beat[];
  public premiumEvents: Event[];
  public mainEvent: Event;

  constructor(private spinner: NgxSpinnerService,
    private genresConfigService: GenresConfigService,
    private beatService: BeatService,
    private artistService: ArtistService,
    private eventService: EventService) {
  }

  ngOnInit() {
    forkJoin([this.fetchMostlyLikedBeats(), this.fetchNewReleases(), this.fetchFeaturedArtists(), this.fetchTrendingBeats(), this.fetchFeaturedBeats(), this.fetchPremiumEvents()]).subscribe(results => {
      this.initTopCharts(results[0]);
      this.initNewRelease(results[1]);
      this.initArtists(results[2]);
      this.trendingBeats = results[3];
      this.featuredBeats = results[4];
      this.mainEvent = results[5].shift();
      this.premiumEvents = results[5];
      this.newReleases = results[1];
      this.initGenres();
    }, () => { }, () => {
      this.spinner.hide('routing');
    })
  }

  initTopCharts(topCharts: Beat[]) {
    this.topCharts = {
      title: 'Top Charts',
      subTitle: 'Listen top chart',
      page: '/music',
      items: topCharts
    };
  }

  initNewRelease(newReleases: Beat[]) {
    this.newRelease = {
      title: 'New Releases',
      subTitle: 'Listen recently release music',
      page: '/music',
      items: newReleases
    }

  }

  initArtists(featuredArtists: Artist[]) {
    this.artists = {
      title: 'Featured Artists',
      subTitle: 'Select you best to listen',
      page: '/artists',
      items: featuredArtists
    };
  }

  //Initialize music genres object for section
  initGenres() {
    this.genres = {
      title: 'Genres',
      subTitle: 'Select you genre',
      page: '/genres',
      items: this.genresConfigService.genresList
    };
  }

  private fetchTrendingBeats(): Observable<Array<Beat>> {
    return this.beatService.getTrending();
  }

  private fetchFeaturedBeats(): Observable<Array<Beat>> {
    return this.beatService.getFeatured();
  }

  private fetchPremiumEvents(): Observable<Array<Event>> {
    return this.eventService.getPremium();
  }

  private fetchMostlyLikedBeats(): Observable<Array<Beat>> {
    return this.beatService.getMostlyLikedBeats();
  }

  private fetchNewReleases(): Observable<Array<Beat>> {
    return this.beatService.getBeats(20, 0);
  }

  private fetchFeaturedArtists(): Observable<Array<Artist>> {
    return this.artistService.getFeaturedArtists();
  }
}
