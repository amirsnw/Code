import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalModalComponent } from './pay-pal-modal.component';

describe('PayPalModalComponent', () => {
  let component: PayPalModalComponent;
  let fixture: ComponentFixture<PayPalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
