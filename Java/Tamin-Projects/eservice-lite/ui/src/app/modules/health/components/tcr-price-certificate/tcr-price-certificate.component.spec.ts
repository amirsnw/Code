import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcrPriceCertificateComponent } from './tcr-price-certificate.component';

describe('TcrPriceCertificateComponent', () => {
  let component: TcrPriceCertificateComponent;
  let fixture: ComponentFixture<TcrPriceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcrPriceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcrPriceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
