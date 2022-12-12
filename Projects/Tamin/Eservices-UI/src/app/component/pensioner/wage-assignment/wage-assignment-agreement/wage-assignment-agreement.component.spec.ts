import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WageAssignmentAgreementComponent } from './wage-assignment-agreement.component';

describe('WageAssignmentAgreementComponent', () => {
  let component: WageAssignmentAgreementComponent;
  let fixture: ComponentFixture<WageAssignmentAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WageAssignmentAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WageAssignmentAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
