import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPaymentSheetSearchComponent } from './workshop-payment-sheet-search.component';

describe('WorkshopPaymentSheetSearchComponent', () => {
  let component: WorkshopPaymentSheetSearchComponent;
  let fixture: ComponentFixture<WorkshopPaymentSheetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopPaymentSheetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPaymentSheetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
