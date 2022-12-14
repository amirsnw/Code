import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopInsuranceProcrastinationListComponent } from './sso-workshop-insurance-procrastination-list.component';

describe('SsoWorkshopInsuranceProcrastinationListComponent', () => {
  let component: SsoWorkshopInsuranceProcrastinationListComponent;
  let fixture: ComponentFixture<SsoWorkshopInsuranceProcrastinationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopInsuranceProcrastinationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopInsuranceProcrastinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
