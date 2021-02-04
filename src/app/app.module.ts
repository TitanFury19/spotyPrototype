import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { SearchComponent } from './componets/search/search.component';
import { ArtistComponent } from './componets/artist/artist.component';
import { NavbarComponent } from './componets/shared/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { _ROUTES } from './app.routes';
import { NoimagepipePipe } from './pipes/noimagepipe.pipe';
import { TarjetasComponent } from './componets/tarjetas/tarjetas.component';
import { LoadingComponent } from './componets/loading/loading.component'
import { NgxLoadingModule } from 'ngx-loading'
import { DomseguroPipe } from './pipes/domseguro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistComponent,
    NavbarComponent,
    NoimagepipePipe,
    TarjetasComponent,
    LoadingComponent,
    DomseguroPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(_ROUTES, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
