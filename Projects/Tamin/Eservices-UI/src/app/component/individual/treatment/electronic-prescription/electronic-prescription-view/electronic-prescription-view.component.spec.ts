import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ElectronicPrescriptionViewComponent } from './electronic-prescription-view.component';

describe('ElectronicPrescriptionViewComponent', () => {
  let component: ElectronicPrescriptionViewComponent;
  let fixture: ComponentFixture<ElectronicPrescriptionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicPrescriptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicPrescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
