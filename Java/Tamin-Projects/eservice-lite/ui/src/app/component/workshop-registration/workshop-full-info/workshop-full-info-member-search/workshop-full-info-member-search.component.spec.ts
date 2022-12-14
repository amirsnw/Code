import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoMemberSearchComponent } from './workshop-full-info-member-search.component';

describe('WorkshopFullInfoMemberSearchComponent', () => {
  let component: WorkshopFullInfoMemberSearchComponent;
  let fixture: ComponentFixture<WorkshopFullInfoMemberSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoMemberSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoMemberSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
