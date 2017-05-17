import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { AuthModule } from 'angular2-auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any =[]
   
  constructor(private postsService: PostsService, private authservice : AuthService, private router: Router) { }

 /*login(name: string, password: string) {
    if(!name){return}
    if(!password){return}
    this.authservice.login(name, password).subscribe(user => {
      this.user = user
      this.tokenservice.setToken(user.token)
    })
  }*/

  login(name: string, password: string) {
    this.authservice.login(name, password).subscribe (user => 
      this.user = user)
    this.router.navigate(['posts'])
  }
  ngOnInit() {
  }

}
