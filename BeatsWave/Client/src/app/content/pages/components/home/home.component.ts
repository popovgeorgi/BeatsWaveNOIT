import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { PlaylistConfigService } from '../../../../core/services/playlist-config.service';
import { RadioConfigService } from '../../../../core/services/radio-config.service';
import { GenresConfigService } from '../../../../core/services/genres-config.service';
import { EventsConfigService } from '../../../../core/services/events-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeatService } from 'src/app/core/services/beat.service';
import { ArtistService } from 'src/app/core/services/artist.service';
import { Beat } from 'src/app/core/models/Beat';
import { LoadingService } from 'src/app/core/services/loading.service';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  carouselArrowPosClass1 = 'arrow-pos-1';
  carouselArrowPosClass2 = 'arrow-pos-2';
  carouselArrowPosClass3 = 'arrow-pos-3';

  topCharts: any = {};
  newRelease: any = {};
  artists: any = {};
  retro: any = {};
  playlist: any = {};
  radio: any = {};
  genres: any = {};
  tasks = [];

  public trendingBeats: Beat[];
  public newReleases: Beat[];
  public featuredBeats: Beat[];

  mainEvent: any = {};
  secondaryEvents: any = [];

  constructor(private spinner: NgxSpinnerService,
    private songsConfigService: SongsConfigService,
    private radioConfigService: RadioConfigService,
    private genresConfigService: GenresConfigService,
    private eventsConfigService: EventsConfigService,
    private beatService: BeatService,
    private aritstService: ArtistService) {
  }

  ngOnInit() {
    this.fetchTrendingBeats().subscribe(res => {
      this.trendingBeats = res;
    })
    this.fetchFeaturedBeats().subscribe(res => {
      this.featuredBeats = res;
    })

    Promise.all([
      this.initTopCharts(),
      this.initNewRelease(),
      this.initEvents(),
      this.initArtists(),
      this.initGenres()
    ]).then(res => {
      this.spinner.hide('routing');
    })
  }

  private fetchTrendingBeats(): Observable<Array<Beat>> {
    return this.beatService.getTrending();
  }

  private fetchFeaturedBeats(): Observable<Array<Beat>> {
    return this.beatService.getFeatured();
  }

  // Initialize top charts object for section
  async initTopCharts() {
    this.topCharts = {
      title: 'Top Charts',
      subTitle: 'Listen top chart',
      page: '/songs',
      items: await this.beatService.getMostlyLikedBeats().toPromise()
    };
  }

  // Initialize new release music object for section
  async initNewRelease() {
    this.newReleases = await this.beatService.getBeats(20, 0).toPromise()
    this.newRelease = {
      title: 'New Releases',
      subTitle: 'Listen recently release music',
      page: '/songs',
      items: this.newReleases
    }

  }

  // Initialize music events object for section
  initEvents() {
    this.mainEvent = this.eventsConfigService.eventsList[0];
    this.secondaryEvents = this.eventsConfigService.eventsList.slice(1, 3);
  }

  // Initialize music artists object for section
  async initArtists() {
    this.artists = {
      title: 'Featured Artists',
      subTitle: 'Select you best to listen',
      page: '/artists',
      items: await this.aritstService.getFeaturedArtists().toPromise()
    };
  }

  // Initialize radio object for section
  initRadio() {
    this.radio = {
      title: 'Radio',
      subTitle: 'Listen live now',
      page: '/stations',
      items: this.radioConfigService.radioList
    };
  }

  // Initialize music genres object for section
  initGenres() {
    this.genres = {
      title: 'Genres',
      subTitle: 'Select you genre',
      page: '/genres',
      items: this.genresConfigService.genresList
    };
  }

}
