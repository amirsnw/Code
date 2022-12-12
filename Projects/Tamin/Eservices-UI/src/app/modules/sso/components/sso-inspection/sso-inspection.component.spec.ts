import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AllInspectionComponent} from './sso-inspection.component';

describe('SsoInspectionComponent', () => {
  let component: SsoInspectionComponent;
  let fixture: ComponentFixture<SsoInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
