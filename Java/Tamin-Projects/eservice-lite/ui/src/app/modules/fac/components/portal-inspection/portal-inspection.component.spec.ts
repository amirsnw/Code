import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalInspectionComponent } from './portal-inspection.component';

describe('PortalInspectionComponent', () => {
  let component: PortalInspectionComponent;
  let fixture: ComponentFixture<PortalInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
