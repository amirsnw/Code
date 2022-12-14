import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportivePackageRegistrationStepThreeComponent } from './supportive-package-registration-step-three.component';

describe('SupportivePackageRegistrationStepThreeComponent', () => {
  let component: SupportivePackageRegistrationStepThreeComponent;
  let fixture: ComponentFixture<SupportivePackageRegistrationStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportivePackageRegistrationStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportivePackageRegistrationStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
