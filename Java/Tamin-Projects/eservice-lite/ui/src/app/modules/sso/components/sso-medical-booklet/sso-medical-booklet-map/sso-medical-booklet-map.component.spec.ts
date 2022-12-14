import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoMedicalBookletMapComponent } from './sso-medical-booklet-map.component';

describe('SsoMedicalBookletMapComponent', () => {
  let component: SsoMedicalBookletMapComponent;
  let fixture: ComponentFixture<SsoMedicalBookletMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoMedicalBookletMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoMedicalBookletMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
