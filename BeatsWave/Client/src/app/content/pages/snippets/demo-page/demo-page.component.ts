import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingService } from '../../../../core/services/loading.service';
import { SkinService } from '../../../../core/services/skin.service';
import { Config } from '../../../../config/config';

@Component({
    selector: 'app-demo-page',
    templateUrl: './demo-page.component.html',
    styles: ['#home-banner { height: 100vh; position: relative; background: url("assets/images/banner/index.png") center no-repeat;' +
    '            -webkit-background-size: cover; background-size: cover; }' +
    '        #hb-content { position: absolute; top: 50%; right: 0; left: 0; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%);' +
    '            -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); font-size: 1rem }' +
    '        .demo .card-img--radius-sm { -webkit-box-shadow: 0 1px 12px 2px rgba(0,0,0, .15); -moz-box-shadow: 0 1px 12px 2px rgba(0,0,0, .15);' +
    '            box-shadow: 0 1px 12px 2px rgba(0,0,0, .15); }' +
    '        .feature i { display: inline-block; width: 2rem; height: 2rem; font-size: 2rem }']
})
export class DemoPageComponent implements OnInit, AfterViewInit {

    public config: Config = new Config();

    constructor(private loadingService: LoadingService,
                private skinService: SkinService,
                private router: Router) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    setTheme(value, page) {
        const theme = this.config.config.themeSkin;
        theme.theme = value;
        this.skinService.skin = theme;
        this.router.navigate([page]);
    }
}
