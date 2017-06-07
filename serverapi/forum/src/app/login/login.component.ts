import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { AuthModule } from 'angular2-auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any =[]
  failed: boolean = false;
  error: boolean = false;
  
   
  constructor(private postsService: PostsService, private authService : AuthService, private router: Router, private translate: TranslateService) {
     translate.addLangs(["Englisch","Deutsch" ])
    translate.setDefaultLang('Englisch')
   }

 /*login(name: string, password: string) {
    if(!name){return}
    if(!password){return}
    this.authservice.login(name, password).subscribe(user => {
      this.user = user
      this.tokenservice.setToken(user.token)
    })
  }*/

  login(name: string, password: string) {
    if(!name){ this.failed=true; return}
    if(!password){this.failed=true;return}
    this.authService.login(name, password).subscribe (user => {
      this.user = user
      if(this.user === true){
        console.log( this.user)
    this.router.navigate(['topics'])}
    else { this.error=true; console.log(this.user); return}
  })}
  ngOnInit() {
   
  }
addUser(name: string, password: string): void {
    this.postsService.postUser(name,password).subscribe(user =>this.user.push(user));
  }
}
