import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopHistoryComponent } from './workshop-history.component';

describe('WorkshopHistoryComponent', () => {
  let component: WorkshopHistoryComponent;
  let fixture: ComponentFixture<WorkshopHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
