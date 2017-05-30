import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Http, HttpModule } from '@angular/http'
import { RouterTestingModule } from '@angular/router/testing'

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let postsService : PostsService;
  let spy : jasmine.Spy;
  let user : any;
  let http: Http;
  
  const testUser = 'test'

beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserComponent]}); 
  });
  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
         PostsService,
         AuthService
      ],
      imports: [ HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    postsService = new PostsService(http)
    spy = spyOn(postsService, 'getAllUser').and.callThrough()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
