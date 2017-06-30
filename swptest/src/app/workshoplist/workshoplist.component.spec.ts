import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshoplistComponent } from './workshoplist.component';

describe('WorkshoplistComponent', () => {
  let component: WorkshoplistComponent;
  let fixture: ComponentFixture<WorkshoplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshoplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshoplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
