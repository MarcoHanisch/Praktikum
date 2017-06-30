import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplistComponent } from './emailtemplist.component';

describe('EmailtemplistComponent', () => {
  let component: EmailtemplistComponent;
  let fixture: ComponentFixture<EmailtemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
