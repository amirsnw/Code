import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredPaymentSheetListComponent } from './insured-payment-sheet-list.component';

describe('InsuredPaymentSheetListComponent', () => {
  let component: InsuredPaymentSheetListComponent;
  let fixture: ComponentFixture<InsuredPaymentSheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredPaymentSheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredPaymentSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
