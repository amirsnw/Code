import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSsoLocationsComponent } from './all-sso-locations.component';

describe('AllSsoLocationsComponent', () => {
  let component: AllSsoLocationsComponent;
  let fixture: ComponentFixture<AllSsoLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSsoLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSsoLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
