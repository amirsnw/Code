import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopPaymentSheetComponent } from './sso-workshop-payment-sheet.component';

describe('SsoWorkshopPaymentSheetComponent', () => {
  let component: SsoWorkshopPaymentSheetComponent;
  let fixture: ComponentFixture<SsoWorkshopPaymentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopPaymentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopPaymentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
