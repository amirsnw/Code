import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitOnlinePaymentInstallmentComponent } from './debit-online-payment-installment.component';

describe('DebitOnlinePaymentInstallmentComponent', () => {
  let component: DebitOnlinePaymentInstallmentComponent;
  let fixture: ComponentFixture<DebitOnlinePaymentInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitOnlinePaymentInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitOnlinePaymentInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
