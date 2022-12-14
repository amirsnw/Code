import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredPaymentSheetSearchComponent } from './insured-payment-sheet-search.component';

describe('InsuredPaymentSheetSearchComponent', () => {
  let component: InsuredPaymentSheetSearchComponent;
  let fixture: ComponentFixture<InsuredPaymentSheetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredPaymentSheetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredPaymentSheetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
