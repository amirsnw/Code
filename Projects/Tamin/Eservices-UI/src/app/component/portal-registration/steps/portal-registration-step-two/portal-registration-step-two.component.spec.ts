import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationStepTwoComponent } from './portal-registration-step-two.component';

describe('PortalRegistrationStepTwoComponent', () => {
  let component: PortalRegistrationStepTwoComponent;
  let fixture: ComponentFixture<PortalRegistrationStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
