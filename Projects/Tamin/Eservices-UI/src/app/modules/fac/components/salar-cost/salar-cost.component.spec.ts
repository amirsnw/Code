import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarCostComponent } from './salar-cost.component';

describe('SalarCostComponent', () => {
  let component: SalarCostComponent;
  let fixture: ComponentFixture<SalarCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
