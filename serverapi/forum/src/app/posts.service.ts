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
  url = 'http://localhost:8080/api';
  constructor(private http: Http) { 
    
  }

  getAllTopics() {
    return this.http.get('http://localhost:8080/api/topics')
      .map(response => response.json());
  }
  getAllPosts() {
    return this.http.get('http://localhost:8080/api/posts')
      .map(response => response.json())
  }
  login(name: string, password: string){//unfertig
  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
      return this.http.post('http://localhost:8080/api/authenticate', JSON.stringify({name:name, password: password}), {headers})              
  }
  getPost(post_id: string) {//unfertig
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.get(`http://localhost:8080/api/posts/${post_id}`, {headers})
        .map(response => response.json())
  }
  getComments(post_id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
     return this.http.get(`http://localhost:8080/api/posts/${post_id}/comments`, {headers})
        .map(response => response.json())
  }
  getAllUser(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.get('http://localhost:8080/api/user', {headers})
        .map(response => response.json());
  }
  postUser(name: string, password: string): Observable<User> {
    
    return this.http.post('http://localhost:8080/api/user', JSON.stringify({name: name, password: password}))
      .map(response => response.json())
  }
  getTopic(topicsname: string){
    return this.http.get(`http://localhost:8080/api/topics/${topicsname}`)
      .map(response => response.json())
  }
  getUser(user_id: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
     return this.http.get(`http://localhost:8080/api/user/${user_id}`, {headers})
        .map(response => response.json());
  }
  
  addPost(title: string, topics: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.post(`${this.url}/posts`,JSON.stringify({title: title, topics: topics}), {headers})
        .map(response => response.json())
  }

  addComment(title: string, content: string, post_id: string){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.post(`${this.url}/posts/${post_id}/comments`,JSON.stringify({title: title, content: content, post_id: post_id}), {headers})
        .map(response => response.json())
  }
  editPost(post, post_id: string){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.put(`${this.url}/posts/${post_id}`,JSON.stringify(post), {headers})
        .map(response => response.json())
  }
  editUser(name: string, password: string, isAdmin: boolean, user_id: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.put(`${this.url}/user/${user_id}`,JSON.stringify({name: name, password: password, isAdmin: isAdmin} ), {headers})
        .map(response => response.json())
  }
}
