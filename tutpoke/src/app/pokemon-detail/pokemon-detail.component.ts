import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon ;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) { };
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.pokemonService.getPokemon(+params['id']))
      .subscribe(pokemon => this.pokemon = pokemon);
  }
  goBack(): void {
      this.location.back();
  }

}
