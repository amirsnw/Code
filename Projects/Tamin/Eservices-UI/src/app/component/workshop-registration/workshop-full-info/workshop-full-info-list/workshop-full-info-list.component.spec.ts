import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoListComponent } from './workshop-full-info-list.component';

describe('WorkshopFullInfoListComponent', () => {
  let component: WorkshopFullInfoListComponent;
  let fixture: ComponentFixture<WorkshopFullInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
