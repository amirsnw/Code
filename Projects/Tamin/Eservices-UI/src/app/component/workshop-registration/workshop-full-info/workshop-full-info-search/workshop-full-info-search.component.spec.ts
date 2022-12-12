import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoSearchComponent } from './workshop-full-info-search.component';

describe('WorkshopFullInfoSearchComponent', () => {
  let component: WorkshopFullInfoSearchComponent;
  let fixture: ComponentFixture<WorkshopFullInfoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
