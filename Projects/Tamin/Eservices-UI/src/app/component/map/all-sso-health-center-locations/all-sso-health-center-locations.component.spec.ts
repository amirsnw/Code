import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSsoHealthCenterLocationsComponent } from './all-sso-health-center-locations.component';

describe('AllSsoHealthCenterLocationsComponent', () => {
  let component: AllSsoHealthCenterLocationsComponent;
  let fixture: ComponentFixture<AllSsoHealthCenterLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSsoHealthCenterLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSsoHealthCenterLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
