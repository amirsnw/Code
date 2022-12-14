import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitInstallmentPaymentComponent } from './sso-debit-installment-payment.component';

describe('SsoDebitInstallmentPaymentComponent', () => {
  let component: SsoDebitInstallmentPaymentComponent;
  let fixture: ComponentFixture<SsoDebitInstallmentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitInstallmentPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitInstallmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
