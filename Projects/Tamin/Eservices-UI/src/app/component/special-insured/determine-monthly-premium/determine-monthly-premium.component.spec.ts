import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DetermineMonthlyPremiumComponent} from './determine-monthly-premium.component';

describe('DetermineMonthlyPremiumComponent', () => {
  let component: DetermineMonthlyPremiumComponent;
  let fixture: ComponentFixture<DetermineMonthlyPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetermineMonthlyPremiumComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetermineMonthlyPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
