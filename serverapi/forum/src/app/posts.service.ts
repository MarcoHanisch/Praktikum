import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export class User {
    name: string;
    password: string;
    isAdmin: boolean
}

@Injectable()
export class PostsService {
  private headers = new Headers({'Content-Type': 'application/json'})
  constructor(private http: Http) { }

  getAllTopics() {
    return this.http.get('http://localhost:8080/api/topics')
      .map(response => response.json());
  }
  getAllPosts() {
    return this.http.get('http://localhost:8080/api/posts')
      .map(response => response.json())
  }
  login(name: string, password: string){//unfertig
      return this.http.post('http://localhost:8080/api/authenticate', JSON.stringify({name:name, password: password}), {headers: this.headers})              
  }
  getPost(post_id: string) {//unfertig
    return this.http.get(`http://localhost:8080/api/posts/${post_id}`)
        .map(response => response.json())
  }
  getComments(post_id: string) {
     return this.http.get(`http://localhost:8080/api/posts/${post_id}/comments`)
        .map(response => response.json())
  }
  getAllUser(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8080/api/user', {headers})
        .map(response => response.json());
  }
  postUser(name: string, password: string): Observable<User> {
    return this.http.post('http://localhost:8080/api/user', JSON.stringify({name: name, password: password}), {headers: this.headers})
      .map(response => response.json())
  }
  getTopic(topicsname: string){
    return this.http.get(`http://localhost:8080/api/topics/${topicsname}`)
      .map(response => response.json())
  }
  getUser(user_id: string){
     return this.http.get(`http://localhost:8080/api/user/${user_id}`)
        .map(response => response.json());
  }
}
