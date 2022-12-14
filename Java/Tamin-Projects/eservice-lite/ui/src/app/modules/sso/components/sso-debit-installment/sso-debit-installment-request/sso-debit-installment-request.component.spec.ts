import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitInstallmentRequestComponent } from './sso-debit-installment-request.component';

describe('SsoDebitInstallmentRequestComponent', () => {
  let component: SsoDebitInstallmentRequestComponent;
  let fixture: ComponentFixture<SsoDebitInstallmentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitInstallmentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitInstallmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
