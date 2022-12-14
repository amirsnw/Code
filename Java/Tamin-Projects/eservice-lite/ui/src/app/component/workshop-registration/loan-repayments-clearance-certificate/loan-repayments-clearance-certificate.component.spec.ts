import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentsClearanceCertificateComponent } from './loan-repayments-clearance-certificate.component';

describe('LoanRepaymentsClearanceCertificateComponent', () => {
  let component: LoanRepaymentsClearanceCertificateComponent;
  let fixture: ComponentFixture<LoanRepaymentsClearanceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaymentsClearanceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaymentsClearanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
