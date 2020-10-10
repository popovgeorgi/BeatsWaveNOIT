import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

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
                path: 'music',
                component: MusicComponent,
            },
            {
                path: 'artists',
                component: ArtistsComponent
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
                component: AddMusicComponent
            },
            {
                path: 'stations',
                component: StationsComponent
            },
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'favorites',
                component: FavoritesComponent
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
                component: AddEventComponent
            },
            {
                path: 'profile',
                component: UserProfileComponent
            },
            {
                path: 'plan',
                component: UserPlanComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
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
        ReferralsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PerfectScrollbarModule,
        PartialsModule,
        CoreModule,
        LayoutModule,
        ChartsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class ComponentsModule { }
