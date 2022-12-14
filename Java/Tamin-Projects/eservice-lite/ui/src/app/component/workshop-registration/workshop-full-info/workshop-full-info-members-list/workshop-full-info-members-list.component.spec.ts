import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoMembersListComponent } from './workshop-full-info-members-list.component';

describe('WorkshopFullInfoMembersListComponent', () => {
  let component: WorkshopFullInfoMembersListComponent;
  let fixture: ComponentFixture<WorkshopFullInfoMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
