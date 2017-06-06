import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailComponent } from './userdetail.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostsService } from '../posts.service';
import { HttpModule, Http } from '@angular/http';
import {  RouterTestingModule } from '@angular/router/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable'
import { User } from '../models/users'

let user: User[]= []

class MockPostsService {

  getUser(id): Observable<User[]> {
    let user: User[] = []
    user.push(new User('4', 'SuperUser', 'Admin', true))
    return Observable.of(user)
  }
}

describe('UserdetailComponent', () => {
  let component: UserdetailComponent;
  let fixture: ComponentFixture<UserdetailComponent>;
  let postsService : PostsService

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserdetailComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailComponent ],
      providers: [
        {provide: PostsService, useClass: MockPostsService}
        ],
      imports: [ HttpModule, BrowserModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    spyOn(postsService, 'getUser').and.callThrough()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(postsService.getUser).toHaveBeenCalledTimes(1)
  });
  it('should get a user', () => {
    component.ngOnInit()
    expect(component.user).not.toBeNull()
    expect(postsService.getUser).toHaveBeenCalled()
    expect(component.user.length).toBe(1)
    
  })
});
