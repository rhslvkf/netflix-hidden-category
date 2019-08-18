import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GenresComponent } from './genres/genres.component';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { SqlStorageService } from './sql-storage.service';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GenresComponent,
    GenreDetailsComponent,
    SearchPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SqlStorageService,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
