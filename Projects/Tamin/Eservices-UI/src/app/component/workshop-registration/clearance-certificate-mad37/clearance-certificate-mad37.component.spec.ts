import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceCertificateMad37Component } from './clearance-certificate-mad37.component';

describe('ClearanceCertificateMad37Component', () => {
  let component: ClearanceCertificateMad37Component;
  let fixture: ComponentFixture<ClearanceCertificateMad37Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceCertificateMad37Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceCertificateMad37Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
