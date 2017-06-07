import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
   isIn = false;
   loggedIn : boolean;
   title = 'app works'
    toggleState() {
      let bool = this.isIn;
      this.isIn = bool ===false ? true: false;
      
    }
  constructor(private location : Location, private router: Router, private authService: AuthService, private translate: TranslateService){
    translate.addLangs([ "Englisch","Deutsch"])
    translate.setDefaultLang('Englisch')
  }
  goBack(): void{
    this.location.back();
  }
  logout(){
    this.authService.logout()
    this.router.navigate(['login'])
  }
  
  
}
