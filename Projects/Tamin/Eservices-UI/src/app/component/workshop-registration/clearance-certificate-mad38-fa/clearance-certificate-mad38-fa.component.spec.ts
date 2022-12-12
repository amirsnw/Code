import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceCertificateMad38FAComponent } from './clearance-certificate-mad38-fa.component';

describe('ClearanceCertificateMad38FAComponent', () => {
  let component: ClearanceCertificateMad38FAComponent;
  let fixture: ComponentFixture<ClearanceCertificateMad38FAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceCertificateMad38FAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceCertificateMad38FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
