import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopInsuranceProcrastinationSearchComponent } from './sso-workshop-insurance-procrastination-search.component';

describe('SsoWorkshopInsuranceProcrastinationSearchComponent', () => {
  let component: SsoWorkshopInsuranceProcrastinationSearchComponent;
  let fixture: ComponentFixture<SsoWorkshopInsuranceProcrastinationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopInsuranceProcrastinationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopInsuranceProcrastinationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
