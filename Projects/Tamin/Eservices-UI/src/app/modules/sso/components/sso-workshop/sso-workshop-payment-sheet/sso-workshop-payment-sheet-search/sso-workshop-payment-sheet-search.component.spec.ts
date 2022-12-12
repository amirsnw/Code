import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopPaymentSheetSearchComponent } from './sso-workshop-payment-sheet-search.component';

describe('SsoWorkshopPaymentSheetSearchComponent', () => {
  let component: SsoWorkshopPaymentSheetSearchComponent;
  let fixture: ComponentFixture<SsoWorkshopPaymentSheetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopPaymentSheetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopPaymentSheetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
