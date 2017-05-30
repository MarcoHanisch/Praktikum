import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsComponent } from './topics.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;
  let postsService : PostsService
  let authService : AuthService

   beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[TopicsComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsComponent ],
      providers: [ PostsService, AuthService],
      imports:[HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
