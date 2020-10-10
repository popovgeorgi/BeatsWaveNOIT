import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryCardComponent } from './main-cards/primary-card/primary-card.component';
import { SecondaryCardComponent } from './main-cards/secondary-card/secondary-card.component';
import { EventCardComponent } from './event-cards/event-card/event-card.component';
import { EventCountdownCardComponent } from './event-cards/event-countdown-card/event-countdown-card.component';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { SongListViewComponent } from './song-list-view/song-list-view.component';
import { SongOptionsComponent } from './song-options/song-options.component';
import { SongHorizontalComponent } from './song-horizontal/song-horizontal.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CommentComponent } from './comment/comment.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    declarations: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        EventCardComponent,
        EventCountdownCardComponent,
        TruncatePipe,
        SongListViewComponent,
        SongOptionsComponent,
        SongHorizontalComponent,
        ImageCardComponent,
        CommentComponent,
        ThemeSettingsComponent,
        CountdownComponent
    ],
    exports: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        EventCardComponent,
        EventCountdownCardComponent,
        SongListViewComponent,
        SongOptionsComponent,
        SongHorizontalComponent,
        ImageCardComponent,
        CommentComponent,
        ThemeSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PartialsModule { }
