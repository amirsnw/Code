import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentSheetComponent } from './show-payment-sheet.component';

describe('ShowPaymentSheetComponent', () => {
  let component: ShowPaymentSheetComponent;
  let fixture: ComponentFixture<ShowPaymentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPaymentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPaymentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
