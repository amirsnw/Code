import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopInsuranceProcrastinationSearchComponent } from './workshop-insurance-procrastination-search.component';

describe('WorkshopInsuranceProcrastinationSearchComponent', () => {
  let component: WorkshopInsuranceProcrastinationSearchComponent;
  let fixture: ComponentFixture<WorkshopInsuranceProcrastinationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopInsuranceProcrastinationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInsuranceProcrastinationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
