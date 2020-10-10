import { Injectable } from '@angular/core';

import { GenresConfig } from '../../config/genres';

@Injectable({
    providedIn: 'root'
})
export class GenresConfigService {

    public genresConfig: GenresConfig = new GenresConfig();

    constructor() { }

    get genresList() {
        return this.genresConfig.config.items;
    }
}
