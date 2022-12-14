import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMortgagesClearanceCertificateComponent } from './property-mortgages-clearance-certificate.component';

describe('PropertyMortgagesClearanceCertificateComponent', () => {
  let component: PropertyMortgagesClearanceCertificateComponent;
  let fixture: ComponentFixture<PropertyMortgagesClearanceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyMortgagesClearanceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyMortgagesClearanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
