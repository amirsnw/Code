import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditNameListComponent } from './workshop-edit-name-list.component';

describe('WorkshopEditNameListComponent', () => {
  let component: WorkshopEditNameListComponent;
  let fixture: ComponentFixture<WorkshopEditNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
