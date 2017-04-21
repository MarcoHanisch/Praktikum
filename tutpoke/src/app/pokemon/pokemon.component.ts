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
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.pokemonService.create(name)
                .then(pokemon => {
                  this.pokemons.push(pokemon);
                  this.selectedPokemon = null;
                });
}

delete(pokemon: Pokemon): void {
  this.pokemonService
      .delete(pokemon.id)
      .then(() => {
        this.pokemons = this.pokemons.filter(h => h !== pokemon);
        if (this.selectedPokemon === pokemon) { this.selectedPokemon = null; }
      });
}
}
