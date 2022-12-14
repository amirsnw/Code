import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionPayPremiumComponent} from './fraction-pay-premium.component';

describe('FractionPayPremiumComponent', () => {
  let component: FractionPayPremiumComponent;
  let fixture: ComponentFixture<FractionPayPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionPayPremiumComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionPayPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
