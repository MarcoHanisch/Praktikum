import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule, ROUTES } from './app.module'
import { TopicsComponent } from './topics/topics.component'
import { PostsService } from './posts.service';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LoggedInGuard } from './logged-in.guard';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { TopicdetailComponent } from './topicdetail/topicdetail.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { PostaddComponent } from './postadd/postadd.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditcommentComponent } from './editcomment/editcomment.component';
import { HttpModule } from '@angular/http'

import { NO_ERRORS_SCHEMA } from '@angular/core'

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('AppComponent', () => {

let router: Router
let fixture
let location : Location

beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[AppComponent],}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopicsComponent, 
        PostsComponent,
        LoginComponent,
        UserComponent,
        PostdetailComponent,
        TopicdetailComponent,
        UserdetailComponent,
        PostaddComponent,
        EdituserComponent,
        EditcommentComponent
      ],
      providers: [ 
        AuthService, PostsService     
      ],
      imports: [RouterTestingModule.withRoutes(ROUTES), HttpModule],
      schemas: [ NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent)
   
    
   
  }));
  describe('is function', function() {
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works');
  })); 
  });
});
