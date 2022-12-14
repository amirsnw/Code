import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopInsuranceProcrastinationComponent } from './sso-workshop-insurance-procrastination.component';

describe('SsoWorkshopInsuranceProcrastinationComponent', () => {
  let component: SsoWorkshopInsuranceProcrastinationComponent;
  let fixture: ComponentFixture<SsoWorkshopInsuranceProcrastinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopInsuranceProcrastinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopInsuranceProcrastinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
