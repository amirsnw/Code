import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportivePackageRegistrationStepOneComponent } from './supportive-package-registration-step-one.component';

describe('SupportivePackageRegistrationStepOneComponent', () => {
  let component: SupportivePackageRegistrationStepOneComponent;
  let fixture: ComponentFixture<SupportivePackageRegistrationStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportivePackageRegistrationStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportivePackageRegistrationStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
