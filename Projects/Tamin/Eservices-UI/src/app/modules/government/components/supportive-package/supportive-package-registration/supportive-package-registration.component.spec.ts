import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportivePackageRegistrationComponent } from './supportive-package-registration.component';

describe('SupportivePackageRegistrationComponent', () => {
  let component: SupportivePackageRegistrationComponent;
  let fixture: ComponentFixture<SupportivePackageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportivePackageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportivePackageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
