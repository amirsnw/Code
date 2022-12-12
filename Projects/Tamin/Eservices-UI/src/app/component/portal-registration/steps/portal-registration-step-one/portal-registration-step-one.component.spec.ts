import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationStepOneComponent } from './portal-registration-step-one.component';

describe('PortalRegistrationStepOneComponent', () => {
  let component: PortalRegistrationStepOneComponent;
  let fixture: ComponentFixture<PortalRegistrationStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
