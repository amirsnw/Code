import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedHistoryViewComponent } from './unsaved-history-view.component';

describe('UnsavedHistoryViewComponent', () => {
  let component: UnsavedHistoryViewComponent;
  let fixture: ComponentFixture<UnsavedHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsavedHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
