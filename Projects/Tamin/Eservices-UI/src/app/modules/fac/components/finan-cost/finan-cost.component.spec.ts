import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanCostComponent } from './finan-cost.component';

describe('FinanCostComponent', () => {
  let component: FinanCostComponent;
  let fixture: ComponentFixture<FinanCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
