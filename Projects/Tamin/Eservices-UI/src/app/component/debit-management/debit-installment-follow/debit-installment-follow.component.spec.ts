import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitInstallmentFollowComponent } from './debit-installment-follow.component';

describe('DebitInstallmentFollowComponent', () => {
  let component: DebitInstallmentFollowComponent;
  let fixture: ComponentFixture<DebitInstallmentFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitInstallmentFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitInstallmentFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
