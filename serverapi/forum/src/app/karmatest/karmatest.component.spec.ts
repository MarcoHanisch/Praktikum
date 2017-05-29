import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmatestComponent } from './karmatest.component';

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('KarmatestComponent', () => {
  let component: KarmatestComponent;
  let fixture: ComponentFixture<KarmatestComponent>;

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[KarmatestComponent]}); 
  });

 /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KarmatestComponent ]
    })
    .compileComponents();
  }));*/

 beforeEach(() => {
    fixture = TestBed.createComponent(KarmatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a title', () => {
    expect(component.title).not.toBeUndefined
  });
  it('should have a new title', () => {
    component.title = 'anderer Titel';
    fixture.detectChanges();
    expect(component.title).toContain('anderer Titel')
  })
});
