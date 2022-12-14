import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationNewComponent } from './portal-registration-new.component';

describe('PortalRegistrationNewComponent', () => {
  let component: PortalRegistrationNewComponent;
  let fixture: ComponentFixture<PortalRegistrationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
