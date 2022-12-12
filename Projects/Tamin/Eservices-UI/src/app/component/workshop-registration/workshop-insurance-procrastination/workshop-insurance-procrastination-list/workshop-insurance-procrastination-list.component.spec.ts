import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopInsuranceProcrastinationListComponent } from './workshop-insurance-procrastination-list.component';

describe('WorkshopInsuranceProcrastinationListComponent', () => {
  let component: WorkshopInsuranceProcrastinationListComponent;
  let fixture: ComponentFixture<WorkshopInsuranceProcrastinationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopInsuranceProcrastinationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInsuranceProcrastinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
