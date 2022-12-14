import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionObjectionComponent } from './inspection-objection.component';

describe('InspectionObjectionComponent', () => {
  let component: InspectionObjectionComponent;
  let fixture: ComponentFixture<InspectionObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionObjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
