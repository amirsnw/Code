import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionRequestComponent } from './inspection-request.component';

describe('InspectionRequestComponent', () => {
  let component: InspectionRequestComponent;
  let fixture: ComponentFixture<InspectionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
