import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPaymentSheetComponent } from './workshop-payment-sheet.component';

describe('WorkshopPaymentSheetComponent', () => {
  let component: WorkshopPaymentSheetComponent;
  let fixture: ComponentFixture<WorkshopPaymentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopPaymentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPaymentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
