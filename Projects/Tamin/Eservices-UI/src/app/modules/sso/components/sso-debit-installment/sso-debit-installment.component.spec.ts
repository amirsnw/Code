import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitInstallmentComponent } from './sso-debit-installment.component';

describe('SsoDebitInstallmentComponent', () => {
  let component: SsoDebitInstallmentComponent;
  let fixture: ComponentFixture<SsoDebitInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
