import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

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
 
  getPost(post_id: string) {
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
  postUser(name: string, password: string, firstname: string, lastname: string, 
  street: string, number: string, ZIP: string, town: string, country: string, birthday: string): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.post('http://localhost:8080/api/user', 
    JSON.stringify({name: name, password: password, firstname: firstname, 
      lastname: lastname, street: street, number: number, ZIP: ZIP, town: town, country: country, birthday: birthday}), {headers})
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
  getComment(comment_id: string){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
     return this.http.get(`http://localhost:8080/api/comment/${comment_id}`, {headers})
        .map(response => response.json());
  }
  
  addPost(title: string, topics: string, date: Date){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.post(`${this.url}/posts`,JSON.stringify({title: title, topics: topics, date: date}), {headers})
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
  editPost(title:string,topics:string, post_id: string){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.put(`${this.url}/posts/${post_id}`,JSON.stringify({title: title, topics: topics}), {headers})
        .map(response => response.json())
  }
  editUser(name: string, password: string, isAdmin: boolean, user_id: string, firstname: string, lastname: string,
  birthday: string, street: string, number: string, town: string, ZIP: string, country: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.put(`${this.url}/user/${user_id}`,JSON.stringify({name: name, password: password, isAdmin: isAdmin, firstname: firstname,
    lastname: lastname, birthday: birthday, street: street, number: number, town: town, ZIP: ZIP, country: country} ), {headers})
        .map(response => response.json())
  }
   editComment(title: string,content: string, comment_id: string){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.put(`${this.url}/comment/${comment_id}`,JSON.stringify({title: title, content: content}), {headers})
        .map(response => response.json())
  }
  deleteUser(user_id: string): Promise<void>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.delete(`${this.url}/user/${user_id}`, {headers})
        .toPromise()
        .then(()=> null)
  }
  deleteComment(comment_id: string): Promise<void> {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.delete(`${this.url}/comment/${comment_id}`, {headers})
        .toPromise()
        .then(()=> null)
  }
  deletePost(post_id: string): Promise<void>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
    return this.http.delete(`${this.url}/posts/${post_id}`, {headers})
        .toPromise()
        .then(()=> null)
  }
}
