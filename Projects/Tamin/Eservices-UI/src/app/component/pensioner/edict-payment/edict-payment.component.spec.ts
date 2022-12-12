import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictPaymentComponent } from './edict-payment.component';

describe('EdictPaymentComponent', () => {
  let component: EdictPaymentComponent;
  let fixture: ComponentFixture<EdictPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
