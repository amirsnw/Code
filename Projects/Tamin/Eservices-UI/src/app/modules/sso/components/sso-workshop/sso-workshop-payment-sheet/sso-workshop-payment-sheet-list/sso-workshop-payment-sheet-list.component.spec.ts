import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopPaymentSheetListComponent } from './sso-workshop-payment-sheet-list.component';

describe('SsoWorkshopPaymentSheetListComponent', () => {
  let component: SsoWorkshopPaymentSheetListComponent;
  let fixture: ComponentFixture<SsoWorkshopPaymentSheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopPaymentSheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopPaymentSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
