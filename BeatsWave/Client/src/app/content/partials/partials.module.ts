import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';

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
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PhotoResizeComponent } from './photo-resize/photo-resize.component';

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
        CountdownComponent,
        PhotoResizeComponent,
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
        ThemeSettingsComponent,
        PhotoResizeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ImageCropperModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartialsModule { }
