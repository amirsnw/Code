import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitOnlinePaymentFollowComponent } from './debit-online-payment-follow.component';

describe('DebitOnlinePaymentFollowComponent', () => {
  let component: DebitOnlinePaymentFollowComponent;
  let fixture: ComponentFixture<DebitOnlinePaymentFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitOnlinePaymentFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitOnlinePaymentFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
