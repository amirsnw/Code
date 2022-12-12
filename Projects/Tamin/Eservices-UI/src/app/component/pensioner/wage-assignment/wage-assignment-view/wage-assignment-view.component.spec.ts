import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WageAssignmentViewComponent } from './wage-assignment-view.component';

describe('WageAssignmentViewComponent', () => {
  let component: WageAssignmentViewComponent;
  let fixture: ComponentFixture<WageAssignmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WageAssignmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WageAssignmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
