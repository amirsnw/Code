import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictPaymentListComponent } from './edict-payment-list.component';

describe('EdictPaymentListComponent', () => {
  let component: EdictPaymentListComponent;
  let fixture: ComponentFixture<EdictPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
