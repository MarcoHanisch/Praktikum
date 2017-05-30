import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicdetailComponent } from './topicdetail.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { JwtHelper } from 'angular2-jwt'

describe('TopicdetailComponent', () => {
  let component: TopicdetailComponent;
  let fixture: ComponentFixture<TopicdetailComponent>;
  let postsService : PostsService
  let authService : AuthService
  let jwtHelper : JwtHelper


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
  });

  it('should create', () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImlzQWRtaW4iOnRydWV9.xP-dUH5j3A4o4wg6UFpeRU6DF3ZimTbrrignF9D3YCk')
    expect(component).toBeTruthy();
  });
});
