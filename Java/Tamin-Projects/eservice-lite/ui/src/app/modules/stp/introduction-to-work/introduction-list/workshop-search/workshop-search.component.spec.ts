import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSearchComponent } from './workshop-search.component';

describe('WorkshopEditActivitySearchComponent', () => {
  let component: WorkshopSearchComponent;
  let fixture: ComponentFixture<WorkshopEditActivitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
