import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let postsService : PostsService;
  let spy : any;
  let postsServiceStub: {
    user: {
      name: string,
      password: string,
      isAdmin: boolean
    }
  }
  const testUser = 'test'

beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserComponent]}); 
  });
  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        {provide: PostsService, useValue: postsServiceStub},
        {provide: Router},
        {provide: AuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
     postsServiceStub = {
      user: {
        name: 'Test',
        password: 'test',
        isAdmin: false
      }
    }
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    postsService = fixture.debugElement.injector.get(PostsService);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
