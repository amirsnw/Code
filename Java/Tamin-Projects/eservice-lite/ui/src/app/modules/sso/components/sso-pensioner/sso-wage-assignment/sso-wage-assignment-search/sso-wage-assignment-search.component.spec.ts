import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWageAssignmentSearchComponent } from './sso-wage-assignment-search.component';

describe('SsoWageAssignmentSearchComponent', () => {
  let component: SsoWageAssignmentSearchComponent;
  let fixture: ComponentFixture<SsoWageAssignmentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWageAssignmentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWageAssignmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
