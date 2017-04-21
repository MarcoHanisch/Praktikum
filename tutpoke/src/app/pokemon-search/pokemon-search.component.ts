import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { PokemonSearchService } from '../pokemon-search.service';
import { Pokemon } from '../pokemon';
@Component({
  selector: 'pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: [ './pokemon-search.component.css' ],
  providers: [PokemonSearchService]
})
export class PokemonSearchComponent implements OnInit {
  pokemons: Observable<Pokemon[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private pokemonSearchService: PokemonSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.pokemons = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.pokemonSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Pokemon[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Pokemon[]>([]);
      });
  }
  gotoDetail(pokemon: Pokemon): void {
    let link = ['/detail', pokemon.id];
    this.router.navigate(link);
  }
}