import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelancePaymentPremiumComponent} from './freelance-payment-premium.component';

describe('FreelancePaymentPremiumComponent', () => {
  let component: FreelancePaymentPremiumComponent;
  let fixture: ComponentFixture<FreelancePaymentPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancePaymentPremiumComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancePaymentPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
