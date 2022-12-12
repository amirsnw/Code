import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationConfirmComponent } from './portal-registration-confirm.component';

describe('PortalRegistrationConfirmComponent', () => {
  let component: PortalRegistrationConfirmComponent;
  let fixture: ComponentFixture<PortalRegistrationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
