import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardsClearanceCertificateComponent } from './business-cards-clearance-certificate.component';

describe('BusinessCardsClearanceCertificateComponent', () => {
  let component: BusinessCardsClearanceCertificateComponent;
  let fixture: ComponentFixture<BusinessCardsClearanceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCardsClearanceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCardsClearanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
