import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loader = false;
    loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.loader);

    constructor() { }

    get loading() {
        return this.loader;
    }

    set loading(value) {
        this.loader = value;
        this.loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
