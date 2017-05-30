import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommentComponent } from './editcomment.component';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from'@angular/router/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

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
       providers: [ PostsService, AuthService],
      imports:[HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
