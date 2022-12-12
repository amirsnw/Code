import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationStepThreeComponent } from './portal-registration-step-three.component';

describe('PortalRegistrationStepThreeComponent', () => {
  let component: PortalRegistrationStepThreeComponent;
  let fixture: ComponentFixture<PortalRegistrationStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
