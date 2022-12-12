import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentViewComponent } from './sso-wage-assignment-view.component';

describe('SsoWageAssignmentViewComponent', () => {
  let component: SsoWageAssignmentViewComponent;
  let fixture: ComponentFixture<SsoWageAssignmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
