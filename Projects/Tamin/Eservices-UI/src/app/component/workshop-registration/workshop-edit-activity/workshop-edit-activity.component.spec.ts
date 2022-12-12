import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditActivityComponent } from './workshop-edit-activity.component';

describe('WorkshopEditActivityComponent', () => {
  let component: WorkshopEditActivityComponent;
  let fixture: ComponentFixture<WorkshopEditActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
