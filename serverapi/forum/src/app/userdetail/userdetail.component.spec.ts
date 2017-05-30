import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailComponent } from './userdetail.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostsService } from '../posts.service';
import { HttpModule, Http } from '@angular/http';
import {  RouterTestingModule } from '@angular/router/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('UserdetailComponent', () => {
  let component: UserdetailComponent;
  let fixture: ComponentFixture<UserdetailComponent>;

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserdetailComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailComponent ],
      providers: [PostsService],
      imports: [ HttpModule, BrowserModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
