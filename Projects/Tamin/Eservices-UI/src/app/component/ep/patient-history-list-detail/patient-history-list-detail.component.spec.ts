import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryListDetailComponent } from './patient-history-list-detail.component';

describe('PatientHistoryListDetailComponent', () => {
  let component: PatientHistoryListDetailComponent;
  let fixture: ComponentFixture<PatientHistoryListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
