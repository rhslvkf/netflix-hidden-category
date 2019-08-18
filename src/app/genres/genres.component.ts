import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SqlStorageService } from '../sql-storage.service';
import { genres } from '../genres';

@Component({
  selector: 'app-genres',
  templateUrl: 'genres.component.html',
  styleUrls: ['genres.component.scss'],
})
export class GenresComponent implements OnInit {
  parent_id = 0;
  terms: string = "";
  genres = [];

  constructor(public sqlStorageService: SqlStorageService, private translate: TranslateService) {}
  
  ngOnInit() {
    // develop code
    this.translateGenres();

    // deploy code
    // setTimeout(() => {
    //   this.selectAllGenres();
    // }, 1000);
  }

  translateGenres() {
    for (let i = 0; i < genres.length; i++) {
      this.translate.get(genres[i].name).subscribe((res: string) => {
        this.genres.push({id: genres[i].id, name: res, parent_id: genres[i].parent_id});
      });
    }
  }

  selectAllGenres() {
    this.sqlStorageService.query('SELECT * FROM genres ORDER BY name ASC').then(data => {
      let genre;
      for (let i = 0; i < data.res.rows.length; i++) {
        genre = data.res.rows.item(i);
        this.translate.get(genre.name).subscribe((res: string) => {
          this.genres.push({id: genre.id, name: res, parent_id: genre.parent_id});
        });
      }
    }).catch(err => {
      console.log('Unable to SELECT * FROM genres', err.tx, err.err);
    });
  }

  changeParentId(parent_id) {
    this.parent_id = parent_id;
  }
}
