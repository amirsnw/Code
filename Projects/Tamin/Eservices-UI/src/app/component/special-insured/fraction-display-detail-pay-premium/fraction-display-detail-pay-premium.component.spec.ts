import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionDisplayDetailPayPremiumComponent } from './fraction-display-detail-pay-premium.component';

describe('FractionDisplayDetailPayPremiumComponent', () => {
  let component: FractionDisplayDetailPayPremiumComponent;
  let fixture: ComponentFixture<FractionDisplayDetailPayPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FractionDisplayDetailPayPremiumComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionDisplayDetailPayPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
