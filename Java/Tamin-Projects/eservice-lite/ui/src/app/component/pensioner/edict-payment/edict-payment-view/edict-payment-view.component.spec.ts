import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictPaymentViewComponent } from './edict-payment-view.component';

describe('EdictPaymentViewComponent', () => {
  let component: EdictPaymentViewComponent;
  let fixture: ComponentFixture<EdictPaymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictPaymentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
