import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationStepFourComponent } from './portal-registration-step-four.component';

describe('PortalRegistrationStepFourComponent', () => {
  let component: PortalRegistrationStepFourComponent;
  let fixture: ComponentFixture<PortalRegistrationStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
