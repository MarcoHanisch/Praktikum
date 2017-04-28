import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Comment } from './postdetail/postdetail.component';


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
  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get(url)
                .map(response => response.json())
  }
  getComments(id: number): Observable<Comment[]> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http.get(url)
                  .map(response => response.json())
  }
  create(title: string): Observable<Post> {
    return this.http.post(this.postsUrl, JSON.stringify({title: title}), {headers: this.headers})
      .map(response => response.json())
  }
  createComment(id: number, name: string, email: string, body: string): 
  Observable<Comment> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http.post(url, JSON.stringify({email: email, name: name, body: body}), {headers: this.headers})
          .map(response => response.json())
  }
delete(id: number): Promise<void> {
  const url = `${this.postsUrl}/${id}`;
  return this.http.delete(url, {headers: this.headers})
              .toPromise()
              .then(()=> null)
  }
  update(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put(url, JSON.stringify(post))
      .toPromise()
      .then(() => post)
  }
  
}
