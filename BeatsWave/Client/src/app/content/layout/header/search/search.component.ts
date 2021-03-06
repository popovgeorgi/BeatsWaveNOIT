import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../../core/services/search.service';
import { Search } from 'src/app/core/models/Search';
import { Beat } from 'src/app/core/models/Beat';
import { Artist } from 'src/app/core/models/Artist';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  noFoundArtists: boolean = false;
  noFoundBeats: boolean = false;
  searchResult$: Observable<Search>;
  searchSubscription: Subscription;
  beats: Beat[];
  artists: Artist[];
  item: string;

  constructor(private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.searchBeatsAndArtist(term).pipe(
        tap(res => {
          if (res) {
            if (res.beats.length == 0) {
              this.noFoundBeats = true;
            }
            else {
              this.noFoundBeats = false;
            }
            if (res.artists.length == 0) {
              this.noFoundArtists = true;
            }
            else {
              this.noFoundArtists = false;
            }
            this.beats = res.beats;
            this.artists = res.artists;
          }
        })
      ))).subscribe();
  }

  goToPage(page) {
    page = '/' + page;
    this.searchService.hideSearchResult();
    this.router.navigate([page]);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}
