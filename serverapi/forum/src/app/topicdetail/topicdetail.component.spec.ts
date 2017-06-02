import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicdetailComponent } from './topicdetail.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule, Http } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { JwtHelper } from 'angular2-jwt'

describe('TopicdetailComponent', () => {
  let component: TopicdetailComponent;
  let fixture: ComponentFixture<TopicdetailComponent>;
  let postsService : PostsService
  let authService : AuthService
  let jwtHelper : JwtHelper
  let http : Http
  let spy : jasmine.Spy;



   beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[TopicdetailComponent]}); 
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicdetailComponent ],
       providers: [ PostsService, AuthService],
      imports:[HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(TopicdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postsService = new PostsService(http);
    spy = spyOn(postsService, 'getTopic').and.callThrough()
  });

  it('should create', () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJEcmVpIiwiaXNBZG1pbiI6dHJ1ZX0.Jgs0iVKWzJgB95bwh5LT1TDxU1mS19stflAhaQtdnyU')
    expect(component).toBeTruthy();
  });
 
});
