import { Component } from '@angular/core';

import { NavParams, ModalController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { TranslateService } from '@ngx-translate/core';

import { FavoriteService } from '../favorite.service';
import { AdmobFreeService } from '../admob-free.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  genre: any;
  genres: any;

  constructor(
    private navParams: NavParams,
    private favoriteService: FavoriteService,
    private modalController: ModalController,
    private admobFreeService: AdmobFreeService,
    private translate: TranslateService,
    private socialSharing: SocialSharing,
    private platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      this.dismiss();
    });

    this.genre = navParams.get('genre');
    this.genres = navParams.get('genres');
  }

  goToNetflixGenreUrl(genreId) {
    location.href="https://www.netflix.com/browse/genre/" + genreId;
  }

  shareContent(genre) {
    this.admobFreeService.removeBannerAd();
    this.translate.get(genre.name).subscribe((res: string) => {
      this.socialSharing.share('https://www.netflix.com/browse/genre/' + genre.id + '\n\n', res, '', 'Netflix Hidden Genres - https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres')
        .then(() => {
          this.admobFreeService.bannerAd();
        });
    });
  }

  addFavorite(): void {
    if (this.genres != undefined) {
      this.genres.push(this.genre);
    }

    this.favoriteService.addFavorite(this.genre);
  }

  removeFavorite(): void {
    if (this.genres != undefined) {
      for (let i = 0; i < this.genres.length; i++) {
        if (this.genres[i].id == this.genre.id) {
          this.genres.splice(i, 1);
        }
      }
    }

    this.favoriteService.removeFavorite(this.genre);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
