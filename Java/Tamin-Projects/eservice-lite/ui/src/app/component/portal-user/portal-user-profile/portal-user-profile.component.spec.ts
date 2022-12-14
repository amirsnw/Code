import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalUserProfileComponent } from './portal-user-profile.component';

describe('PortalUserProfileComponent', () => {
  let component: PortalUserProfileComponent;
  let fixture: ComponentFixture<PortalUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
