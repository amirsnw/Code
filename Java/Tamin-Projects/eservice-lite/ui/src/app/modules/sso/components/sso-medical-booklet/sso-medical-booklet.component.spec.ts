import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoMedicalBookletComponent } from './sso-medical-booklet.component';

describe('SsoMedicalBookletComponent', () => {
  let component: SsoMedicalBookletComponent;
  let fixture: ComponentFixture<SsoMedicalBookletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoMedicalBookletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoMedicalBookletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
