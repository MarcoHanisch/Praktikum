import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshoptempComponent } from './workshoptemp.component';

describe('WorkshoptempComponent', () => {
  let component: WorkshoptempComponent;
  let fixture: ComponentFixture<WorkshoptempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshoptempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshoptempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
