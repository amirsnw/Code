import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationPursueComponent } from './portal-registration-pursue.component';

describe('PortalRegistrationPursueComponent', () => {
  let component: PortalRegistrationPursueComponent;
  let fixture: ComponentFixture<PortalRegistrationPursueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalRegistrationPursueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationPursueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
