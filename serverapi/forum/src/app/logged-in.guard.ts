import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from 'angular2-auth';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: AuthService, private router: Router) {}

  canActivate ( ) {
    if(this.user.isLoggedIn()){
      return this.user.isLoggedIn()
  } else {
    this.router.navigate(['login']);
    return this.user.isLoggedIn()
  }}
}