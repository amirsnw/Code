import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitOnlinePaymentComponent } from './debit-online-payment.component';

describe('DebitOnlinePaymentComponent', () => {
  let component: DebitOnlinePaymentComponent;
  let fixture: ComponentFixture<DebitOnlinePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitOnlinePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitOnlinePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
