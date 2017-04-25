import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiserviceService {
  private postsUrl = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: Http) { }
 /* getPosts(): Promise<Post[]> {
    return this.http.get(this.postsUrl)
                  .toPromise()
                  .then(response => response.json().data as Post[])
                  
  }*/
  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
                .map(response => response.json())
  }

}
