import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictPaymentComponent } from './sso-edict-payment.component';

describe('EdictPaymentComponent', () => {
  let component: SsoEdictPaymentComponent;
  let fixture: ComponentFixture<SsoEdictPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
