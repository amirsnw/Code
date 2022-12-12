import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDeservedTreatmentComponent } from './sso-deserved-treatment.component';

describe('SsoDeservedTreatmentComponent', () => {
  let component: SsoDeservedTreatmentComponent;
  let fixture: ComponentFixture<SsoDeservedTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDeservedTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDeservedTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
