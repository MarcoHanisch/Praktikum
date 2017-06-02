import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule, Http } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Post } from '../models/posts'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

const addReturn: Post[] = []
const toReturn: Post[] = [];
class MockPostsService {

 public getAllPosts(): Observable<Post[]> {
    let toReturn: Post[] = [] ;
    toReturn.push(new Post('1','Test','Test', 'Test'));
    toReturn.push(new Post('2', 'Drei','Zwei', 'Drei'));
    toReturn.push(new Post('3', 'mal was anderes','Test', 'Drei'))
    return Observable.of(toReturn)
  }

  public addPost(): Observable<Post[]> {
    toReturn.push(new Post('4','weiterer Test','Zwei','Test'))
    return Observable.of(toReturn)
    
  }


}


describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  let postsService : PostsService
  let authService : AuthService
  let spy : jasmine.Spy
  let http : Http
  let posts: any

   beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[PostsComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
       providers: [ 
         {provide: PostsService, useClass: MockPostsService}, 
       AuthService
       //{ provide: XHRBackend, useClass: MockBackend }
       ],
      imports:[HttpModule, RouterTestingModule]
    }).overrideComponent(PostsComponent, {
      set : {
        providers: [
          {provide: PostsService, useClass: MockPostsService}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    //spyOn(postsService, 'getAllPosts').and.returnValue(Observable.of(toReturn))
    authService = TestBed.get(AuthService);
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 /* it('should show all posts really', inject([PostsService, XHRBackend], (postsService, mockBackend ) => {
   inject([PostsService, XHRBackend], (postsService, mockBackend) => {

        const mockResponse = {
          posts: [
            { id: 0, title: 'Video 0', topic: 'Test' },
            { id: 1, title: 'Video 1', topic: 'Test' },
            { id: 2, title: 'Video 2' , topic: 'Test3'},
            { id: 3, title: 'Video 3', topic: 'Test3' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        postsService.getAllPosts().subscribe((posts) => {
          expect(posts.length).toBe(4);
          expect(posts[0].title).toEqual('Video 0');
          expect(posts[1].title).toEqual('Video 1');
          expect(posts[2].title).toEqual('Video 2');
          expect(posts[3].title).toEqual('Video 3');
        });
      });
  }));*/
  it('should get posts', () => {
    component.ngOnInit()
    expect(component.posts).not.toEqual(toReturn)
    expect(component.posts).not.toBeNull()
    expect(component.posts.length).toBe(3)
    expect(component.posts.length).not.toBe(5)
    expect(authService.isLoggedIn).toHaveBeenCalled()
    expect(component.loggedIn).toBe(true)
  })
  /*it('should add a post', () => {
    component.addPost('weiterer Test', 'Zwei')
    expect(component.posts).toBe(4)
  })*/
})

