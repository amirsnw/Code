import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentComponent } from './sso-wage-assignment.component';

describe('SsoWageAssignmentComponent', () => {
  let component: SsoWageAssignmentComponent;
  let fixture: ComponentFixture<SsoWageAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
