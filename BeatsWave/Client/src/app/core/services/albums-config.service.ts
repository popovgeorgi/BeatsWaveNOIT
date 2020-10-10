import { Injectable } from '@angular/core';

import { AlbumsConfig } from '../../config/albums';

@Injectable({
    providedIn: 'root'
})
export class AlbumsConfigService {

    public albumsConfig: AlbumsConfig = new AlbumsConfig();

    constructor() { }

    get albumsList() {
        return this.albumsConfig.config.items;
    }

    getAlbumByIb(id) {
        return this.albumsList.find(album => album.id === id);
    }
}
