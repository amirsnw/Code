import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoInsuredPaymentSheetListComponent } from './sso-insured-payment-sheet-list.component';

describe('SsoInsuredPaymentSheetListComponent', () => {
  let component: SsoInsuredPaymentSheetListComponent;
  let fixture: ComponentFixture<SsoInsuredPaymentSheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoInsuredPaymentSheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoInsuredPaymentSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
