import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictPaymentSearchComponent } from './sso-edict-payment-search.component';

describe('EdictPaymentSearchComponent', () => {
  let component: SsoEdictPaymentSearchComponent;
  let fixture: ComponentFixture<SsoEdictPaymentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictPaymentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictPaymentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
