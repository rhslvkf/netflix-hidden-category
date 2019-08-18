import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  { path: '', redirectTo: 'genres', pathMatch: 'full' },
  { path: 'genres', component: GenresComponent },
  { path: 'genre/:genreId', component: GenreDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
