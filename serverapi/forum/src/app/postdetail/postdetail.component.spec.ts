import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailComponent } from './postdetail.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { Post } from '../models/posts'
import { Comment } from '../models/comments'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

let post: Post
let comment: Comment[] = []

class MockPostsService {

  public getPost(): Observable<Post> {
    post = new Post('1','EIn Post', 'Test', 'Drei')
    return Observable.of(post)
  }

  public getComments(): Observable<Comment[]> {
    comment.push(new Comment('1','Ein Comment','Ein erster Kommentar','1','Drei'))
    return Observable.of(comment)
  }

}

describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;
 let postsService : PostsService
  let authService : AuthService

   beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[PostdetailComponent]}); 
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostdetailComponent ],
       providers: [ 
         {provide: PostsService, useClass: MockPostsService}
       , AuthService],
      imports:[HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostdetailComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
