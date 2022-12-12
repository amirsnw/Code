import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalarCostComponent } from './new-salar-cost.component';

describe('NewSalarCostComponent', () => {
  let component: NewSalarCostComponent;
  let fixture: ComponentFixture<NewSalarCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSalarCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSalarCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
