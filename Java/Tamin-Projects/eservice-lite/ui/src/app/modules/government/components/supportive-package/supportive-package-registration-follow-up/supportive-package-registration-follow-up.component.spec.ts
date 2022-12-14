import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportivePackageRegistrationFollowUpComponent } from './supportive-package-registration-follow-up.component';

describe('SupportivePackageRegistrationFollowUpComponent', () => {
  let component: SupportivePackageRegistrationFollowUpComponent;
  let fixture: ComponentFixture<SupportivePackageRegistrationFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportivePackageRegistrationFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportivePackageRegistrationFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
