import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentEvaluateComponent } from './sso-wage-assignment-evaluate.component';

describe('SsoWageAssignmentEvaluateComponent', () => {
  let component: SsoWageAssignmentEvaluateComponent;
  let fixture: ComponentFixture<SsoWageAssignmentEvaluateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentEvaluateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
