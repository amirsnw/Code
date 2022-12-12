import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentRequestComponent } from './sso-wage-assignment-request.component';

describe('SsoWageAssignmentRequestComponent', () => {
  let component: SsoWageAssignmentRequestComponent;
  let fixture: ComponentFixture<SsoWageAssignmentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
