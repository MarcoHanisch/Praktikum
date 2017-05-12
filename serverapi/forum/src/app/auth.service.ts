import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class AuthService {
  private loggedIn = false;
  private headers = new Headers({'Content-Type': 'application/json'})

  constructor(private http: Http) {
     this.loggedIn = !!localStorage.getItem('auth_token');
   }
/*
  login(name: string, password: string){//unfertig
      return this.http.post('http://localhost:8080/api/authenticate', JSON.stringify({name:name, password: password}), {headers: this.headers})
          .map(response => response.json())
         
}

  logout() {
    this.tokenservice.removeToken()
  }

  isLoggedIn() {
    let token = this.tokenservice.getToken();
    if(token && token.token) {
      return !token.isExpired();
    }
    return false
  }*/
login(name: string, password: string){//unfertig
      return this.http.post('http://localhost:8080/api/authenticate', JSON.stringify({name:name, password: password}), {headers: this.headers})
      .map(response => response.json())
      .map((response) => {
        if(response.succes) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true
        }
        return response.succes
      })
}
logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
}
}


