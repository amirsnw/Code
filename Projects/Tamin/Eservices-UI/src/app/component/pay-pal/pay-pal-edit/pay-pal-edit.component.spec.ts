import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalEditComponent } from './pay-pal-edit.component';

describe('PayPalEditComponent', () => {
  let component: PayPalEditComponent;
  let fixture: ComponentFixture<PayPalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
