import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitInstallmentPaymentComponent } from './debit-installment-payment.component';

describe('DebitInstallmentPaymentComponent', () => {
  let component: DebitInstallmentPaymentComponent;
  let fixture: ComponentFixture<DebitInstallmentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitInstallmentPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitInstallmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
