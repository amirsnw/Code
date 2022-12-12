import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeservedTreatmentComponent } from './deserved-treatment.component';

describe('DeservedTreatmentComponent', () => {
  let component: DeservedTreatmentComponent;
  let fixture: ComponentFixture<DeservedTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeservedTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeservedTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
