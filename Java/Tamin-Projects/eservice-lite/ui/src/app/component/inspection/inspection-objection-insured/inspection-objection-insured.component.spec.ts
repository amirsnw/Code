import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionObjectionInsuredComponent } from './inspection-objection-insured.component';

describe('InspectionObjectionInsuredComponent', () => {
  let component: InspectionObjectionInsuredComponent;
  let fixture: ComponentFixture<InspectionObjectionInsuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionObjectionInsuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionObjectionInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
