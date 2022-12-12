import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitInstallmentFollowComponent } from './sso-debit-installment-follow.component';

describe('SsoDebitInstallmentFollowComponent', () => {
  let component: SsoDebitInstallmentFollowComponent;
  let fixture: ComponentFixture<SsoDebitInstallmentFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitInstallmentFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitInstallmentFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
