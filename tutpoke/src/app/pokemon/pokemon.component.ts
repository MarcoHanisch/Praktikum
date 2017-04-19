import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {

   pokemons: Pokemon[];
  constructor(
    private pokemonService: PokemonService,
    private router: Router) {}
  selectedPokemon: Pokemon;

  getPokemons(): void {
    this.pokemonService.getPokemons().then(pokemons => this.pokemons = pokemons);
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPokemon.id]);
  }

}
