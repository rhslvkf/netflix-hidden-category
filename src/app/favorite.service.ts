import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SqlStorageService } from './sql-storage.service';
import{ MyToastService } from './my-toast.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private myToastService: MyToastService,
    private translate: TranslateService,
    public sqlStorageService: SqlStorageService
  ) {}

  addFavorite(genre): void {
    genre.favorite_flag = 1;

    this.translate.get("addFavoriteMsg").subscribe((res: string) => {
      this.myToastService.showToast(res);
    });

    this.sqlStorageService.query('UPDATE genres SET favorite_flag = ? WHERE id = ?', [1, genre.id])
      .then()
      .catch(err => {
        console.log('Unable to UPDATE genres SET favorite_flag = ? WHERE id = ?', err.tx, err.err);
      });

  }

  removeFavorite(genre): void {
    genre.favorite_flag = 0;

    this.translate.get("removeFavoriteMsg").subscribe((res: string) => {
      this.myToastService.showToast(res);
    });

    this.sqlStorageService.query('UPDATE genres SET favorite_flag = ? WHERE id = ?', [0, genre.id])
      .then()
      .catch(err => {
        console.log('Unable to UPDATE genres SET favorite_flag = ? WHERE id = ?', err.tx, err.err);
      });
  }
}
