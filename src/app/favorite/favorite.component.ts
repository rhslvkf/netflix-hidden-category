import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ModalController } from '@ionic/angular';

import { favorite_genres } from '../genres';
import { SqlStorageService } from '../sql-storage.service';
import { ModalPage } from '../modal/modal.page';

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
    private sqlStorageService: SqlStorageService,
    private modalController: ModalController
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

  async openModal(genre) {
    const modal = await this.modalController.create({
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'genre-modal',
      component: ModalPage,
      componentProps: {
        'genre': genre,
        'genres': this.genres
      }
    });

    return await modal.present();
  }
}
