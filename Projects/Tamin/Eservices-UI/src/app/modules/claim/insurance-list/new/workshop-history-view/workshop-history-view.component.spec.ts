import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopHistoryViewComponent } from './workshop-history-view.component';

describe('WorkshopHistoryViewComponent', () => {
  let component: WorkshopHistoryViewComponent;
  let fixture: ComponentFixture<WorkshopHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
