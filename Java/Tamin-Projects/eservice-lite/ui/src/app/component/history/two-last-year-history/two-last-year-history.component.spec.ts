import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLastYearHistoryComponent } from './two-last-year-history.component';

describe('TwoLastYearHistoryComponent', () => {
  let component: TwoLastYearHistoryComponent;
  let fixture: ComponentFixture<TwoLastYearHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoLastYearHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoLastYearHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
