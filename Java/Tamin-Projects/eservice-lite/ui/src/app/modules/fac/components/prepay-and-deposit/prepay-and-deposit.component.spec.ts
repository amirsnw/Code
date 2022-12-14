import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepayAndDepositComponent } from './prepay-and-deposit.component';

describe('PrepayAndDepositComponent', () => {
  let component: PrepayAndDepositComponent;
  let fixture: ComponentFixture<PrepayAndDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepayAndDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepayAndDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
