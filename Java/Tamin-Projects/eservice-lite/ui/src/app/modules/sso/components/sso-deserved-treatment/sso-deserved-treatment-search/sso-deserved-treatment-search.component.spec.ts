import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDeservedTreatmentSearchComponent } from './sso-deserved-treatment-search.component';

describe('SsoDeservedTreatmentSearchComponent', () => {
  let component: SsoDeservedTreatmentSearchComponent;
  let fixture: ComponentFixture<SsoDeservedTreatmentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDeservedTreatmentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDeservedTreatmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
