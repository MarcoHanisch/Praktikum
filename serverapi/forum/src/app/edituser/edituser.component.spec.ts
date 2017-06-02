import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserComponent } from './edituser.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import { User } from '../models/users'

let user: User[]= []

class MockPostsService {

  public  getUser(id): Observable<User[]> {
    let user: User[] = []
    user.push(new User('4', 'SuperUser', 'Admin', true))
    return Observable.of(user)
  }

  public editUser(id): Observable<User[]> {
    user.splice(0,1,new User('4','andererUser','Admin', true))
    return Observable.of(user)
    
  }
}

describe('EdituserComponent', () => {
  
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  let postsService : PostsService

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[EdituserComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserComponent ],
       providers: [ 
         {provide: PostsService, useClass: MockPostsService}
       , AuthService],
      imports:[HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    //spyOn(postsService, 'editUser').and.callThrough()
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the user', () => {
    let content: User[] = [new User('4', 'SuperUser', 'Admin', true)]
    expect(component.user.length).toBe(1)
    expect(component.user).toEqual(content)
  })
  it('should update the user', () => {
    postsService.editUser('andererSuper', 'Admin', true, '5')
    component.user = user
    //expect(postsService.editUser).toHaveBeenCalled()
    let content: User[] = [new User('4','andererUser','Admin', true)]
    expect(component.user.length).toBe(1)
    expect(component.user).toEqual(content)
  })
});
