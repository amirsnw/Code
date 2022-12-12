import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingApprovalsClearanceCertificateComponent } from './building-approvals-clearance-certificate.component';

describe('BuildingApprovalsClearanceCertificateComponent', () => {
  let component: BuildingApprovalsClearanceCertificateComponent;
  let fixture: ComponentFixture<BuildingApprovalsClearanceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingApprovalsClearanceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingApprovalsClearanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
