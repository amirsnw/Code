import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryListComponent } from './patient-history-list.component';

describe('PatientHistoryListComponent', () => {
  let component: PatientHistoryListComponent;
  let fixture: ComponentFixture<PatientHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
