import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { TranslateService } from '@ngx-translate/core';

import { MyToastService } from './my-toast.service';
import { AdmobFreeService } from './admob-free.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {
  backButtonSubscription;
  public counter = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private globalization: Globalization,
    private myToastService: MyToastService,
    private router: Router,
    private admobFreeService: AdmobFreeService,
    private socialSharing: SocialSharing
    ) {
      this.initializeApp();
    }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (this.router.url == '/genres' && this.counter == 0) {
        this.counter++;
        this.translate.get("exitAppMsg").subscribe((res: string) => {
          this.myToastService.showToast(res);
        });
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else if (this.router.url == '/genres' && this.counter == 1) {
        navigator['app'].exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
    
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.setLang();
    });
  }

  setLang() {
    this.translate.setDefaultLang('en');

    this.globalization.getPreferredLanguage()
      .then(res => res.value === 'ko-KR' ? this.translate.use('ko') : this.translate.use('en'))
      .catch(e => console.log(e));
  }

  shareApp() {
    this.admobFreeService.removeBannerAd();
    this.socialSharing.share('', '', '', 'https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres')
      .then(() => {
        this.admobFreeService.bannerAd();
      });
  }

  interstitialAd() {
    this.admobFreeService.interstitialAd();
  }
}
