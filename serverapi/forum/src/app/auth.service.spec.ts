import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { HttpModule } from '@angular/http'
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('AuthService', () => {

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({providers:[AuthService]}); 
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('should give the state of LoggedIn is false', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn()).toBeDefined()
    expect(service.isLoggedIn()).toBe(false)
  }))
  it('should log in a user', inject([AuthService], (service: AuthService) => {
    expect(service.login('Komoot', 'radfahren')).toBeTruthy()
  }))
});
