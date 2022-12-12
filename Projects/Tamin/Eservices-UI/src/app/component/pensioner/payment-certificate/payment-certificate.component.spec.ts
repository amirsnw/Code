import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCertificateComponent } from './payment-certificate.component';

describe('PaymentCertificateComponent', () => {
  let component: PaymentCertificateComponent;
  let fixture: ComponentFixture<PaymentCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
