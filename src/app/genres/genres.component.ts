import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { TranslateService } from '@ngx-translate/core';

import { SqlStorageService } from '../sql-storage.service';
import { FavoriteService } from '../favorite.service';
import { genres } from '../genres';
import { AdmobFreeService } from '../admob-free.service';

@Component({
  selector: 'app-genres',
  templateUrl: 'genres.component.html',
  styleUrls: ['genres.component.scss'],
})
export class GenresComponent implements OnInit {
  title = "Netflix Hidden Genres";
  parent_id = 0;
  terms: string = "";
  genres = [];

  constructor(
    private sqlStorageService: SqlStorageService,
    private translate: TranslateService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private admobFreeService: AdmobFreeService,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.admobFreeService.interstitialAd();
    this.admobFreeService.bannerAd();

    this.sqlStorageService.setDatabaseState.subscribe(() => {
      this.selectAllGenres();
    });

    let initFlag = true;
    this.route.paramMap.subscribe(() => {
      this.terms = "";
      this.genres = [];
      // develop code
      // this.translateGenres();
      
      // deploy code
      if (!initFlag) this.selectAllGenres();
      initFlag = false;
    });
  }

  translateGenres() {
    for (let i = 0; i < genres.length; i++) {
      this.translate.get(genres[i].name).subscribe((res: string) => {
        this.genres.push({id: genres[i].id, name: res, parent_id: genres[i].parent_id, favorite_flag: genres[i].favorite_flag});
      });
    }
  }

  selectAllGenres() {
    this.sqlStorageService.query('SELECT * FROM genres ORDER BY name ASC').then(data => {
      let genre;
      for (let i = 0; i < data.res.rows.length; i++) {
        genre = data.res.rows.item(i);
        this.translate.get(genre.name).subscribe((res: string) => {
          this.genres.push({id: genre.id, name: res, parent_id: genre.parent_id, favorite_flag: genre.favorite_flag});
        });
      }
    }).catch(err => {
      console.log('Unable to SELECT * FROM genres', err.tx, err.err);
    });
  }

  changeParentId(parent_id) {
    this.parent_id = parent_id;
  }

  addFavorite(genre): void {
    this.favoriteService.addFavorite(genre);
  }

  removeFavorite(genre): void {
    this.favoriteService.removeFavorite(genre);
  }

  goToNetflixGenreUrl(genreId) {
    location.href="https://www.netflix.com/browse/genre/" + genreId;
  }

  shareApp() {
    this.admobFreeService.hideBannerAd();
    this.socialSharing.share('', '', '', 'https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres')
      .then(() => {
        this.admobFreeService.showBannerAd();
      });
  }

  shareContent(genre) {
    this.admobFreeService.hideBannerAd();
    this.socialSharing.share('https://www.netflix.com/browse/genre/' + genre.id + '\n\n', genre.name, '', 'Netflix Hidden Genres - https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres')
      .then(() => {
        this.admobFreeService.showBannerAd();
      });
  }
}
