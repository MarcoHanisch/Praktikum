import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from 'angular2-auth';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: AuthService) {}

  canActivate ( ) {
    return this.user.isLoggedIn();
  }
}