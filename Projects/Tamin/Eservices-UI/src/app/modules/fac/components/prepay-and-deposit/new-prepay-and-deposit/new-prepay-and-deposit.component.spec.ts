import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrepayAndDepositComponent } from './new-prepay-and-deposit.component';

describe('NewPrepayAndDepositComponent', () => {
  let component: NewPrepayAndDepositComponent;
  let fixture: ComponentFixture<NewPrepayAndDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrepayAndDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrepayAndDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
