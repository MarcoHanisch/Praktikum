import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

const routes: Routes = [
      { path: 'pokemons',  component: PokemonComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detail/:id', component: PokemonDetailComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule],
  declarations: []
})
export class AppRoutingModule { }
