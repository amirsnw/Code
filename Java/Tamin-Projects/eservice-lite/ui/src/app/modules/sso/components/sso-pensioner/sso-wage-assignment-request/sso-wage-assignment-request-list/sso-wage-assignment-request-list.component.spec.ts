import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentRequestListComponent } from './sso-wage-assignment-request-list.component';

describe('SsoWageAssignmentRequestListComponent', () => {
  let component: SsoWageAssignmentRequestListComponent;
  let fixture: ComponentFixture<SsoWageAssignmentRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
