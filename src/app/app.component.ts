import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';

import { TranslateService } from '@ngx-translate/core';

import { SqlStorageService } from './sql-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private globalization: Globalization,
    public sqlStorageService: SqlStorageService
    ) {
      this.initializeApp();
    }
    
  initializeApp() {
    this.platform.ready().then(() => {
      this.setLang().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    });
  }

  async setLang() {
    await this.translate.setDefaultLang('ko');

    await this.globalization.getPreferredLanguage()
      .then(res => res.value === 'ko-KR' ? this.translate.use('ko') : this.translate.use('en'))
      .catch(e => console.log(e));
  }
}
