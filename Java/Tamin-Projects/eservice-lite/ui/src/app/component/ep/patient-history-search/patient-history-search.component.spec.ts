import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistorySearchComponent } from './patient-history-search.component';

describe('PatientHistorySearchComponent', () => {
  let component: PatientHistorySearchComponent;
  let fixture: ComponentFixture<PatientHistorySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistorySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
