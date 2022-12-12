import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicPrescriptionListComponent } from './electronic-prescription-list.component';

describe('ٍٍٍElectronicPrescriptionListComponent', () => {
  let component: ElectronicPrescriptionListComponent;
  let fixture: ComponentFixture<ElectronicPrescriptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicPrescriptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicPrescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


