import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalListComponent } from './pay-pal-list.component';

describe('PayPalListComponent', () => {
  let component: PayPalListComponent;
  let fixture: ComponentFixture<PayPalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
