import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelancePayPremiumComponent} from './freelance-pay-premium.component';

describe('FreelancePayPremiumComponent', () => {
  let component: FreelancePayPremiumComponent;
  let fixture: ComponentFixture<FreelancePayPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancePayPremiumComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancePayPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
