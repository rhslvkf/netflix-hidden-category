import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { genres } from '../genres';
import { SqlStorageService } from '../sql-storage.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss'],
})
export class GenreDetailsComponent implements OnInit {
  title = '';
  genres = [];

  constructor(
    private route: ActivatedRoute,
    private sqlStorageService: SqlStorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genres = [];
      // develop code
      // for (let i = 0; i < genres.length; i++) {
      //   if (genres[i].parent_id == +params.get('genreId') || genres[i].id == +params.get('genreId')) {
      //     this.genres.push({id: genres[i].id, name: genres[i].name, parent_id: genres[i].parent_id, favorite_flag: genres[i].favorite_flag});
      //   }
      //   if (genres[i].id == +params.get('genreId')) {
      //     this.title = genres[i].name;
      //   }
      // }

      // deploy code
      this.selectGenresByParentId(params.get('genreId'));
    });
  }

  selectGenresByParentId(parentId) {
    this.sqlStorageService.query('SELECT * FROM genres WHERE parent_id = ? OR id = ? ORDER BY name ASC', [parentId, parentId]).then(data => {
      let genre: any;
      for (let i = 0; i < data.res.rows.length; i++) {
        genre = data.res.rows.item(i);
        this.genres.push({id: genre.id, name: genre.name, parent_id: genre.parent_id, favorite_flag: genre.favorite_flag});

        if (genre.id == parentId) {
          this.title = genre.name;
        }
      }
    }).catch(err => {
      console.log('Unable to SELECT * FROM genres WHERE parent_id = ? OR id = ? ORDER BY name ASC', err.tx, err.err);
    });
  }

  async openModal(genre) {
    const modal = await this.modalController.create({
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'genre-modal',
      component: ModalPage,
      componentProps: {
        'genre': genre
      }
    });

    return await modal.present();
  }
}
