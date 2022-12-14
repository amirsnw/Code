import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitInstallmentComponent } from './debit-installment.component';

describe('DebitInstallmentComponent', () => {
  let component: DebitInstallmentComponent;
  let fixture: ComponentFixture<DebitInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
