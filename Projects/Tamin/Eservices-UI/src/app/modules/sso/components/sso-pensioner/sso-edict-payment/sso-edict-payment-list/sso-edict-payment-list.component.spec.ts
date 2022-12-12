import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictPaymentListComponent } from './sso-edict-payment-list.component';

describe('EdictPaymentListComponent', () => {
  let component: SsoEdictPaymentListComponent;
  let fixture: ComponentFixture<SsoEdictPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
