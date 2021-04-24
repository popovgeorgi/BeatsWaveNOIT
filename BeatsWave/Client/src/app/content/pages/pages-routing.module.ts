import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './snippets/landing-page/landing-page.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: '404',
        component: ErrorPageComponent
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
