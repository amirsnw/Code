import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageHistoryCalcComponent } from './marriage-history-calc.component';

describe('MarriageHistoryCalcComponent', () => {
  let component: MarriageHistoryCalcComponent;
  let fixture: ComponentFixture<MarriageHistoryCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageHistoryCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageHistoryCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
