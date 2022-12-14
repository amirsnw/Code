import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditActivitySearchComponent } from './workshop-edit-activity-search.component';

describe('WorkshopEditActivitySearchComponent', () => {
  let component: WorkshopEditActivitySearchComponent;
  let fixture: ComponentFixture<WorkshopEditActivitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditActivitySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditActivitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
