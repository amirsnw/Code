import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentListComponent } from './sso-wage-assignment-list.component';

describe('SsoWageAssignmentListComponent', () => {
  let component: SsoWageAssignmentListComponent;
  let fixture: ComponentFixture<SsoWageAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
