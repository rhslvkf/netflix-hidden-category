import { Injectable } from '@angular/core';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdmobFreeService {

  constructor(private admobFree: AdMobFree) { }

  interstitialAd() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      // isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-8843457940870268/7560079647"
    };
    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.interstitial.prepare()
      .then()
      .catch(e => console.log(e));
  }

  bannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      // isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-8843457940870268/5778140401"
    };
    this.admobFree.banner.config(bannerConfig);
 
    this.admobFree.banner.prepare()
      .then()
      .catch(e => console.log(e));
  }
}
