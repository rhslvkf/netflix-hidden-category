import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { favorite_genres } from '../genres';
import { SqlStorageService } from '../sql-storage.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  genres = [];
  removeFavoriteTitle = "";
  removeFavoriteConfirmMsg = "";

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private alertController: AlertController,
    private sqlStorageService: SqlStorageService,
    private favoriteService: FavoriteService,
    private socialSharing: SocialSharing
  ) {
    this.setTranslate();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genres = [];
      // develop code
      // this.genres = favorite_genres;

      // deploy code
      this.selectFavorites();
    });
  }

  setTranslate() {
    this.translate.get("removeFavoriteTitle").subscribe((res: string) => {
      this.removeFavoriteTitle = res;
    });
    this.translate.get("removeFavoriteConfirmMsg").subscribe((res: string) => {
      this.removeFavoriteConfirmMsg = res;
    });
  }

  selectFavorites() {
    this.sqlStorageService.query('SELECT * FROM genres WHERE favorite_flag = 1 ORDER BY name ASC').then(data => {
      for (let i = 0; i < data.res.rows.length; i++) {
        this.genres.push({id: data.res.rows.item(i).id, name: data.res.rows.item(i).name, parent_id: data.res.rows.item(i).parent_id, favorite_flag: data.res.rows.item(i).favorite_flag});
      }
    }).catch(err => {
      console.log('Unable to SELECT * FROM genres WHERE favorite_flag = 1 ORDER BY name ASC', err.tx, err.err);
    });
  }

  async removeFavoriteConfirm(genre) {
    const alert = await this.alertController.create({
      header: this.removeFavoriteTitle,
      message: this.removeFavoriteConfirmMsg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Okay',
          handler: () => {
            this.removeFavorite(genre);
          }
        }
      ]
    });

    await alert.present();
  }

  removeFavorite(genre) {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].id == genre.id) {
        this.genres.splice(i, 1);
      }
    }

    this.favoriteService.removeFavorite(genre);
  }

  goToNetflixGenreUrl(genreId) {
    location.href="https://www.netflix.com/browse/genre/" + genreId;
  }

  shareApp() {
    this.socialSharing.share('', '', '', 'https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres');
  }

  shareContent(genre) {
    this.translate.get(genre.name).subscribe((res: string) => {
      this.socialSharing.share('https://www.netflix.com/browse/genre/' + genre.id + '\n\n', res, '', 'Netflix Hidden Genres - https://play.google.com/store/apps/details?id=com.rhslvkf.netflixhiddengenres');
    });
  }
}
