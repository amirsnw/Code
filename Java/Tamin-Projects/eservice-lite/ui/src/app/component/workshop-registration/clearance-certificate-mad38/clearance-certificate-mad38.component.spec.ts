import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceCertificateMad38Component } from './clearance-certificate-mad38.component';

describe('ClearanceCertificateMad38Component', () => {
  let component: ClearanceCertificateMad38Component;
  let fixture: ComponentFixture<ClearanceCertificateMad38Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceCertificateMad38Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceCertificateMad38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
