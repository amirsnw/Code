import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPaymentSheetListComponent } from './workshop-payment-sheet-list.component';

describe('WorkshopPaymentSheetListComponent', () => {
  let component: WorkshopPaymentSheetListComponent;
  let fixture: ComponentFixture<WorkshopPaymentSheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopPaymentSheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPaymentSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
