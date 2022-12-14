import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceDisplayDetailPayPremiumComponent } from './freelance-display-detail-pay-premium.component';

describe('FreelanceDisplayDetailPayPremiumComponent', () => {
  let component: FreelanceDisplayDetailPayPremiumComponent;
  let fixture: ComponentFixture<FreelanceDisplayDetailPayPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FreelanceDisplayDetailPayPremiumComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceDisplayDetailPayPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
