import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictHistoryViewComponent } from './conflict-history-view.component';

describe('ConflictHistoryViewComponent', () => {
  let component: ConflictHistoryViewComponent;
  let fixture: ComponentFixture<ConflictHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
