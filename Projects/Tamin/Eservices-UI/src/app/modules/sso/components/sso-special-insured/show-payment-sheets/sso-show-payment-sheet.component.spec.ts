import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoShowPaymentSheetComponent } from './sso-show-payment-sheet.component';

describe('SsoShowPaymentSheetComponent', () => {
  let component: SsoShowPaymentSheetComponent;
  let fixture: ComponentFixture<SsoShowPaymentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoShowPaymentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoShowPaymentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
