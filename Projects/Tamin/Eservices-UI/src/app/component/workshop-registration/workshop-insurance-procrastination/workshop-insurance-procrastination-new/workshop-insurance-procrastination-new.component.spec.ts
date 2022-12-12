import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopInsuranceProcrastinationNewComponent } from './workshop-insurance-procrastination-new.component';

describe('WorkshopInsuranceProcrastinationNewComponent', () => {
  let component: WorkshopInsuranceProcrastinationNewComponent;
  let fixture: ComponentFixture<WorkshopInsuranceProcrastinationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopInsuranceProcrastinationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInsuranceProcrastinationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
