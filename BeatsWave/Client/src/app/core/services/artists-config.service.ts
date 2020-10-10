import { Injectable } from '@angular/core';

import { ArtistsConfig } from '../../config/artists';

@Injectable({
    providedIn: 'root'
})
export class ArtistsConfigService {

    public artistsConfig: ArtistsConfig = new ArtistsConfig();

    constructor() { }

    get artistsList() {
        return this.artistsConfig.config.items;
    }

    getArtistByIb(id) {
        return this.artistsList.find(artist => artist.id === id);
    }
}
