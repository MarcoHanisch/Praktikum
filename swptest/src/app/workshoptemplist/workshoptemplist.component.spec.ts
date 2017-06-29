import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshoptemplistComponent } from './workshoptemplist.component';

describe('WorkshoptemplistComponent', () => {
  let component: WorkshoptemplistComponent;
  let fixture: ComponentFixture<WorkshoptemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshoptemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshoptemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
