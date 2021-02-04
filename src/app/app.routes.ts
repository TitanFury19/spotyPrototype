import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './componets/home/home.component';
import { SearchComponent } from './componets/search/search.component';
import { ArtistComponent } from './componets/artist/artist.component';


export const _ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search/:idtoken', component: SearchComponent },
    { path: 'artist/:id/:idtoken', component: ArtistComponent },
    { path: 'path4', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(_ROUTES)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }


