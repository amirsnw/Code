import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinanCostComponent } from './new-finan-cost.component';

describe('NewFinanCostComponent', () => {
  let component: NewFinanCostComponent;
  let fixture: ComponentFixture<NewFinanCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFinanCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFinanCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
