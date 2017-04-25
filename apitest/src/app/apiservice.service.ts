import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiserviceService {
  private headers = new Headers({'Content-Type': 'application/json'});
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
  getPost(id: number): Observable<Post[]> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get(url)
                .map(response => response.json())
  }
  getComments(id: number): Observable<Comment[]> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http.get(url)
                  .map(response => response.json());
  }
  create(title: string): Observable<Post[]> {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.postsUrl, {name}, options)
                      .map(response => response.json())
  }
delete(id: number): Promise<void> {
  const url = `${this.postsUrl}/${id}`;
  return this.http.delete(url, {headers: this.headers})
              .toPromise()
              .then(()=> null)
}

  }
 
  

