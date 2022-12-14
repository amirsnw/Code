import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoInsuredPaymentSheetSearchComponent } from './sso-insured-payment-sheet-search.component';

describe('SsoInsuredPaymentSheetSearchComponent', () => {
  let component: SsoInsuredPaymentSheetSearchComponent;
  let fixture: ComponentFixture<SsoInsuredPaymentSheetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoInsuredPaymentSheetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoInsuredPaymentSheetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
