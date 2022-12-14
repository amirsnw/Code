import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentRequestCancelComponent } from './sso-wage-assignment-request-cancel.component';

describe('SsoWageAssignmentRequestCancelComponent', () => {
  let component: SsoWageAssignmentRequestCancelComponent;
  let fixture: ComponentFixture<SsoWageAssignmentRequestCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentRequestCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentRequestCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
