import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { ComponentsComponent } from './components.component';
import { HomeComponent } from './home/home.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { LayoutModule } from '../../layout/layout.module';
import { GenresComponent } from './genres/genres.component';
import { MusicComponent } from './music/music.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';
import { SongsComponent } from './songs/songs.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { StationsComponent } from './stations/stations.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { AddMusicComponent } from './songs/add-music/add-music.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserPlanComponent } from './user/user-plan/user-plan.component';
import { SettingsComponent } from './user/settings/settings.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './albums/album-details/album-details.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TotalUserComponent } from './analytics/total-user/total-user.component';
import { TotalSongsComponent } from './analytics/total-songs/total-songs.component';
import { PurchasesComponent } from './analytics/purchases/purchases.component';
import { StatisticsComponent } from './analytics/statistics/statistics.component';
import { ReferralsComponent } from './analytics/referrals/referrals.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserMyBeatsComponent } from './user/user-my-beats/user-my-beats.component';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { Role } from 'src/app/core/models/Role';
import { PhotoResizeComponent } from '../../partials/photo-resize/photo-resize.component';
import { GenreListingComponent } from './genres/genre-listing/genre-listing.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { DefaultSimpleModalOptionConfig, defaultSimpleModalOptions } from 'ngx-simple-modal';
import { LandingPageComponent } from '../snippets/landing-page/landing-page.component';
import { PagesModule } from '../pages.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'genres',
        component: GenresComponent,
      },
      {
        path: 'genre/:name',
        component: GenreListingComponent
      },
      {
        path: 'music',
        component: MusicComponent,
      },
      {
        path: 'artists',
        component: ArtistsComponent,
      },
      {
        path: 'artist/:id/details',
        component: ArtistDetailsComponent,
      },
      {
        path: 'songs',
        component: SongsComponent
      },
      {
        path: 'song/:id/details',
        component: SongDetailsComponent
      },
      {
        path: 'albums',
        component: AlbumsComponent
      },
      {
        path: 'album/:id/details',
        component: AlbumDetailsComponent
      },
      {
        path: 'add-music',
        component: AddMusicComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.Beatmaker, Role.Administrator] }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.Administrator] }
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'event/:id/details',
        component: EventDetailsComponent
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.Manager, Role.Administrator] }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'plan',
        component: UserPlanComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'my-beats',
        component: UserMyBeatsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
];

@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    GenresComponent,
    MusicComponent,
    ArtistsComponent,
    ArtistDetailsComponent,
    SongsComponent,
    SongDetailsComponent,
    StationsComponent,
    FavoritesComponent,
    HistoryComponent,
    EventsComponent,
    EventDetailsComponent,
    AddEventComponent,
    AddMusicComponent,
    UserProfileComponent,
    UserPlanComponent,
    SettingsComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    AnalyticsComponent,
    TotalUserComponent,
    TotalSongsComponent,
    PurchasesComponent,
    StatisticsComponent,
    ReferralsComponent,
    UserMyBeatsComponent,
    GenreListingComponent,
    CheckoutComponent,
    SongEditComponent
  ],
  entryComponents: [
    PhotoResizeComponent,
    SongEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    PartialsModule,
    CoreModule,
    LayoutModule,
    ChartsModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    NgxSpinnerModule,
    InfiniteScrollModule
  ],
  providers: [
    ThemeService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: {
        ...defaultSimpleModalOptions, ...{
          wrapperDefaultClasses: 'simple-modal modal fade',
          wrapperClass: 'show',
          closeOnEscape: true,
          closeOnClickOutside: true,
          animationDuration: 1000,
        }
      }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
