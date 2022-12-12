import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopInsuranceProcrastinationComponent } from './workshop-insurance-procrastination.component';

describe('WorkshopInsuranceProcrastinationComponent', () => {
  let component: WorkshopInsuranceProcrastinationComponent;
  let fixture: ComponentFixture<WorkshopInsuranceProcrastinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopInsuranceProcrastinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInsuranceProcrastinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
