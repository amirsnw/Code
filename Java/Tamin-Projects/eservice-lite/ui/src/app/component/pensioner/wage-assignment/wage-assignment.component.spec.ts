import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WageAssignmentComponent } from './wage-assignment.component';

describe('WageAssignmentComponent', () => {
  let component: WageAssignmentComponent;
  let fixture: ComponentFixture<WageAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WageAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WageAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
