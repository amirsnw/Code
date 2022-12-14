import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportivePackageRegistrationStepTwoComponent } from './supportive-package-registration-step-two.component';

describe('SupportivePackageRegistrationStepTwoComponent', () => {
  let component: SupportivePackageRegistrationStepTwoComponent;
  let fixture: ComponentFixture<SupportivePackageRegistrationStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportivePackageRegistrationStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportivePackageRegistrationStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
