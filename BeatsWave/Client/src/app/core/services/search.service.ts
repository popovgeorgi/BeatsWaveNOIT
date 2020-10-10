import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private search = false;
    searchStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.search);

    constructor() { }

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
