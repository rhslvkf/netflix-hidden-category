import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { genres } from '../genres';
import { SqlStorageService } from '../sql-storage.service';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss'],
})
export class GenreDetailsComponent implements OnInit {
  topGenreName = '';
  genres = [];

  constructor(
    private route: ActivatedRoute,
    public sqlStorageService: SqlStorageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // develop code
      for (let i = 0; i < genres.length; i++) {
        if (genres[i].parent_id == +params.get('genreId') || genres[i].id == +params.get('genreId')) {
          this.genres.push({id: genres[i].id, name: genres[i].name, parent_id: genres[i].parent_id});
        }
        if (genres[i].id == +params.get('genreId')) {
          this.topGenreName = genres[i].name;
        }
      }

      // deploy code
      // this.selectGenresByParentId(params.get('genreId'));
    });
  }

  selectGenresByParentId(parentId) {
    this.sqlStorageService.query('SELECT * FROM genres WHERE parent_id = ? OR id = ? ORDER BY name ASC', [parentId, parentId]).then(data => {
      let genre;
      for (let i = 0; i < data.res.rows.length; i++) {
        genre = data.res.rows.item(i);
        this.genres.push({id: genre.id, name: genre.name, parent_id: genre.parent_id});

        if (genre.id == parentId) {
          this.topGenreName = genre.name;
        }
      }
      console.log('selectGenresByParentId');
      console.log(this.genres);
      console.log(this.topGenreName);
    }).catch(err => {
      console.log('Unable to SELECT * FROM genres WHERE parent_id = ? OR id = ? ORDER BY name ASC', err.tx, err.err);
    });
  }

  addFavorite(): void {
    console.log('call addFavorite');

  }
}
