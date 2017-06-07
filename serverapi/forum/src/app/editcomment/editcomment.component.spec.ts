import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommentComponent } from './editcomment.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { Comment } from '../models/comments'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

let comment : Comment[] = []

class MockPostsService {

  public getComment(id): Observable<Comment[]> {
    let comment: Comment[] = []
    comment.push(new Comment('89','Ein superKommentar', 'Oder doch nicht?','1','Drei'))
    return Observable.of(comment)
  }
}

describe('EditcommentComponent', () => {
  let component: EditcommentComponent;
  let fixture: ComponentFixture<EditcommentComponent>;
 let postsService : PostsService
  let authService : AuthService

   beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[EditcommentComponent]}); 
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcommentComponent ],
       providers: [ 
         {provide: PostsService, useClass: MockPostsService}
         , AuthService],
      imports:[HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcommentComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
