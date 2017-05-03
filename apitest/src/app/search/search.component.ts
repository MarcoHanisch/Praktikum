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

import { PostSearchService } from './postsearchservice';
import { Post } from '../postlist/postlist.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PostSearchService]
})
export class SearchComponent implements OnInit {
  posts: Observable<Post[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private postSearchService: PostSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.posts = this.searchTerms
      .debounceTime(300)       
      .distinctUntilChanged()   
      .switchMap(term => term  
        ? this.postSearchService.search(term)
        : Observable.of<Post[]>([]))
      
  }

  gotoDetail(post: Post) {
    this.router.navigate(['/detail', post.id])
  }
}


