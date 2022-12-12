import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WageAssignmentEditComponent } from './wage-assignment-edit.component';

describe('WageAssignmentEditComponent', () => {
  let component: WageAssignmentEditComponent;
  let fixture: ComponentFixture<WageAssignmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WageAssignmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WageAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
