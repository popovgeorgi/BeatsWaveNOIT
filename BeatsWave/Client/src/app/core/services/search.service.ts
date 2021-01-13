import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Search } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchPath = environment.apiUrl + '/search';
  private search = false;
  searchStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.search);
  public searchTerms = new Subject<string>();

  constructor(private http: HttpClient) { }

  searchBeatsAndArtist(term: string): Observable<Search> {
    if(term){
      return this.http.get<Search>(this.searchPath + '/' + term);
    }
    return of(null);
  }

  get searchResult() {
    return this.search;
  }

  set searchResult(value) {
    this.search = value;
    this.searchStatus.next(value);
  }

  hideSearchResult() {
    this.searchResult = true;
  }
}
