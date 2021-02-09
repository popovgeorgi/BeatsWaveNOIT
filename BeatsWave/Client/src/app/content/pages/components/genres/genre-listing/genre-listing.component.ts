import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Beat } from 'src/app/core/models/Beat';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-genre-listing',
  templateUrl: './genre-listing.component.html',
})
export class GenreListingComponent implements OnInit, AfterViewInit {

  public gridView = false;
  public beats: Beat[];
  public hasMoreBeatsToInclude: boolean = true;
  public beatsCount: number;
  private itemsPerPage: number = 20;
  private page = 1;
  private genre: string;
  private userFavourites: Array<number>;

  constructor(private beatService: BeatService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit() {
    this.fetchInitialBeats().subscribe(results => {
      this.userFavourites = results[1];
      this.setFeedLikes(results[0], this.userFavourites);

      let beats = results[0];
      if (beats.length < this.itemsPerPage) {
        this.hasMoreBeatsToInclude = false;
      }
      this.beats = beats;
      this.beatsCount = beats.length;
    });
  }

  private fetchInitialBeats(): Observable<[Beat[], number[]]> {
    return this.route.params.pipe(map(params => {
      let genre = params['name'];
      if (genre == 'Hip-Hop') {
        genre = 'HipHop';
      }
      else if (genre == 'R&B') {
        genre = 'RB';
      }
      this.genre = genre;
      return genre;
    }),
      mergeMap(genre => forkJoin([this.fetchGenreBeats(genre), this.fetchUserFavourites()])));
  }

  private fetchGenreBeats(genre: string): Observable<Array<Beat>> {
    return this.beatService.getBeatsByGenre(genre, this.itemsPerPage, (this.page - 1) * this.itemsPerPage)
  }

  showMore() {
    this.page++;
    this.beatService.getBeatsByGenre(this.genre, this.itemsPerPage, (this.page - 1) * this.itemsPerPage)
    .pipe(tap((res) => {
      if (this.userFavourites) {
        this.setFeedLikes(res, this.userFavourites);
      }
    }))
    .subscribe(beats => {
      if (beats.length < this.itemsPerPage) {
        this.hasMoreBeatsToInclude = false;
      }
      this.beats = this.beats.concat(beats);
    })
  }

  public onSelect(event) {
    let option = event.target.value;
    if (option == 0) {
      this.beats = this.beats.sort((a, b) => {
        return <any>new Date(b.createdOn) - <any>new Date(a.createdOn);
      });
    }
    else if (option == 1) {
      this.beats = this.beats.sort((a, b) => b.likesCount - a.likesCount);
    }
  }

  private fetchUserFavourites(): Observable<Array<number>> {
    return this.userService.getFavouritesByIds();
  }

  private setFeedLikes(beats: Beat[], userFavourites: Array<number>) {
    let map = new Map<string, Array<number>>();
    map.set('favourites', userFavourites);
    beats.forEach(beat => {
      if (map.get('favourites').includes(beat.id)) {
        beat.isLiked = true;
      }
      else {
        beat.isLiked = false;
      }
    })
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
