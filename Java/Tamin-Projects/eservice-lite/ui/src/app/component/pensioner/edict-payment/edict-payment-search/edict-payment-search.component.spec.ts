import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictPaymentSearchComponent } from './edict-payment-search.component';

describe('EdictPaymentSearchComponent', () => {
  let component: EdictPaymentSearchComponent;
  let fixture: ComponentFixture<EdictPaymentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictPaymentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictPaymentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
