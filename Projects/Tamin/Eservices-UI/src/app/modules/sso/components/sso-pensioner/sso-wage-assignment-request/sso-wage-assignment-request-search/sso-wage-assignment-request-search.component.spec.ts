import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentRequestSearchComponent } from './sso-wage-assignment-request-search.component';

describe('SsoWageAssignmentRequestSearchComponent', () => {
  let component: SsoWageAssignmentRequestSearchComponent;
  let fixture: ComponentFixture<SsoWageAssignmentRequestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentRequestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
