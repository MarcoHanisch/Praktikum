import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokemonService {
  private pokemonsUrl = 'api/pokemons';
  getPokemons(): Promise<Pokemon[]> 
  {
    return this.http.get(this.pokemonsUrl)
                .toPromise()
                .then(response => response.json().data as Pokemon[])
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getPokemon(id: number): Promise<Pokemon> {
    const url =`${this.pokemonsUrl}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json().data as Pokemon)
                    .catch(this.handleError);
  }
  constructor(private http: Http) { }
private headers = new Headers({'Content-Type': 'application/json'});

update(pokemon: Pokemon): Promise<Pokemon> {
  const url = `${this.pokemonsUrl}/${pokemon.id}`;
  return this.http 
              .put(url, JSON.stringify(pokemon), {headers: this.headers})
              .toPromise()
              .then(() => pokemon)
              .catch(this.handleError);
}
create(name: string): Promise<Pokemon> {
  return this.http   
            .post(this.pokemonsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Pokemon)
            .catch(this.handleError)
}

delete(id: number): Promise<void> {
  const url = `${this.pokemonsUrl}/${id}`;
  return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
}
}
