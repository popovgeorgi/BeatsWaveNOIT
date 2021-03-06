import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/core/models/Artist';

import { SearchService } from '../../../core/services/search.service';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html'
})
export class ImageCardComponent implements OnInit {

    @Input() item: Artist;
    @Input() routeLink: any;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';

    constructor(private searchService: SearchService) { }

    @HostListener('click') onClick() {
        this.searchService.hideSearchResult();
    }

    ngOnInit() {
    }

}
