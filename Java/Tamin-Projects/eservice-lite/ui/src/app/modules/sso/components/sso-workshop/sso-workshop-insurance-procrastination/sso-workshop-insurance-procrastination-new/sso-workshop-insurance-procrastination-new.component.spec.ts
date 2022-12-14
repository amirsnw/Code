import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopInsuranceProcrastinationNewComponent } from './sso-workshop-insurance-procrastination-new.component';

describe('SsoWorkshopInsuranceProcrastinationNewComponent', () => {
  let component: SsoWorkshopInsuranceProcrastinationNewComponent;
  let fixture: ComponentFixture<SsoWorkshopInsuranceProcrastinationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopInsuranceProcrastinationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopInsuranceProcrastinationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
