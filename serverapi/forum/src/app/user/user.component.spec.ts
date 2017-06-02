import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Http, HttpModule } from '@angular/http'
import { RouterTestingModule } from '@angular/router/testing'
import { User } from '../models/users'
import 'rxjs/add/observable/of';


import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';


const loggedIn = true
const toReturn : User[] = [new User('1','Test','Test'),
new User('2', 'Drei','Zwei')
];  
class MockPostsService {
 
 public getAllUser(): Observable<User[]> {
    let toReturn: User[] = [] ;
    toReturn.push(new User('1','Test','Test', false));
    toReturn.push(new User('2', 'Drei','Zwei', true));
    return Observable.of(toReturn)
  };

public postUser( name: string, password: string): Observable<User[]> {
  toReturn.push(new User('8' ,name,password, false))
  return Observable.of(toReturn)
}

public deleteUser(): Promise<void> {
  toReturn.splice(2,1)
  return
}

}



describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let postsService : PostsService;
  let spy : jasmine.Spy;
  let user : any;
  let http: Http;
  let authService : AuthService
  
  const testUser = 'test'

beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserComponent]}); 
  });
  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        {provide: PostsService, useClass: MockPostsService} ,
       AuthService
      ],
      imports: [ HttpModule, RouterTestingModule]
    })/*.overrideComponent(UserComponent, {
      set : {
        providers: [
          {provide: PostsService, useClass: MockPostsService}
        ]
      }
    })*/
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    spyOn(postsService, 'getAllUser').and.returnValue(Observable.of(toReturn))
    spyOn(postsService, 'postUser').and.callThrough()
    authService = TestBed.get(AuthService);
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();   
  });
  it( 'Should set the user', () => {
    component.ngOnInit();
    expect(component.user).toEqual(toReturn)
    expect(component.user).not.toBeNull()
    expect(component.user.length).toBe(2)
    expect(component.user.length).not.toBe(5)
    expect(postsService.getAllUser).toHaveBeenCalled()
    expect(authService.isLoggedIn).toHaveBeenCalled()
    expect(component.loggedIn).toBe(true)
    let table = fixture.debugElement.nativeElement.querySelector('table')
    expect(table).toBeDefined()
  })
  it('should add a user', () => {
    postsService.postUser('Nutzer34', 'fünf')
    expect(component.user.length).toBe(3)
    expect(postsService.postUser).toHaveBeenCalledTimes(1)
    //postsService.getAllUser()
    fixture.detectChanges()
  })
  it('should delete a user', () => {
    postsService.deleteUser('7')
    fixture.detectChanges()
    expect(component.user.length).toBe(2)
    postsService.getAllUser()    
  })
});
