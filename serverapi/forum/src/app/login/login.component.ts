import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { AuthModule } from 'angular2-auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { FacebookService, LoginResponse } from 'ngx-facebook'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any =[]
  failed: boolean = false;
  error: boolean = false;

  
   
  constructor(private postsService: PostsService, private authService : AuthService, private router: Router, 
  private translate: TranslateService, private fb: FacebookService, private formBuilder: FormBuilder) {
     translate.addLangs(["Englisch","Deutsch" ])
    translate.setDefaultLang('Englisch')
    let InitParams = {
      appId: '813569922141631',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    }
    fb.init(InitParams)
   }

 /*login(name: string, password: string) {
    if(!name){return}
    if(!password){return}
    this.authservice.login(name, password).subscribe(user => {
      this.user = user
      this.tokenservice.setToken(user.token)
    })
  }*/
  loginWithFacebook(): void {
    this.fb.login()
      .then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error))

  }
  login(name: string, password: string) {
    if(!name){ this.failed=true; return}
    if(!password){this.failed=true;return}
    this.authService.login(name, password).subscribe (user => {
      this.user = user
      if(this.user === true){
    this.router.navigate(['topics'])}
    else { this.error=true; return}
  })}
  ngOnInit() {
  
   
  }
  gotoCreate(){
   return this.router.navigate(['newuser'])
  }
  getProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
      })
      
}
}
