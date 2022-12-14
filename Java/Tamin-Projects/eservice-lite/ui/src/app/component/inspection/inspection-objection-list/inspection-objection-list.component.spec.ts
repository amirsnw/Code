import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionObjectionListComponent } from './inspection-objection-list.component';

describe('InspectionObjectionListComponent', () => {
  let component: InspectionObjectionListComponent;
  let fixture: ComponentFixture<InspectionObjectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionObjectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionObjectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
