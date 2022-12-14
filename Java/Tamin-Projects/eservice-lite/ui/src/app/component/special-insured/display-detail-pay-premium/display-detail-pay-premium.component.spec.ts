import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailPayPremiumComponent } from './display-detail-pay-premium.component';

describe('DisplayDetailPayPremiumComponent', () => {
  let component: DisplayDetailPayPremiumComponent;
  let fixture: ComponentFixture<DisplayDetailPayPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDetailPayPremiumComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDetailPayPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
