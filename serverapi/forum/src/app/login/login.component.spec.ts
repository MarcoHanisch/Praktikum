import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { Location } from '@angular/common'

import { LoginComponent } from './login.component';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { HttpModule } from '@angular/http'
import { RouterModule, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let postsService : PostsService;
  let spy : jasmine.Spy;
  let authService : AuthService;
  let http : Http
  

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[LoginComponent]}); 
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ PostsService, AuthService],
      imports:[HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = new AuthService(http)
    spy = spyOn(authService, 'login').and.callThrough()
  });

  it('should create with empty inputs', () => {
    de = fixture.debugElement.query(By.css('input'))
    el = de.nativeElement
    expect(component).toBeTruthy()
    expect(el.textContent).toBe('')
    expect(spy).not.toHaveBeenCalled()
  });
  it('should click login', async(() => {
    spyOn(component, 'login')
    let button = fixture.debugElement.nativeElement.querySelector('button')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled()
    })
  }))
});
