import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalSearchComponent } from './pay-pal-search.component';

describe('PayPalSearchComponent', () => {
  let component: PayPalSearchComponent;
  let fixture: ComponentFixture<PayPalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
