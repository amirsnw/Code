import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditActivityListComponent } from './workshop-edit-activity-list.component';

describe('WorkshopEditActivityListComponent', () => {
  let component: WorkshopEditActivityListComponent;
  let fixture: ComponentFixture<WorkshopEditActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
