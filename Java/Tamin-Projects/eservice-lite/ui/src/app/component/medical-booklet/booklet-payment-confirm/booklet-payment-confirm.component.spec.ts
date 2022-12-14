import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletPaymentConfirmComponent } from './booklet-payment-confirm.component';

describe('BookletPaymentConfirmComponent', () => {
  let component: BookletPaymentConfirmComponent;
  let fixture: ComponentFixture<BookletPaymentConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletPaymentConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletPaymentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
