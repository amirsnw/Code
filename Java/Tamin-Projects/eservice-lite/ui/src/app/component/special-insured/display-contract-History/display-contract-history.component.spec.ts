import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContractHistoryComponent } from './display-contract-history.component';

describe('DisplayContractHistoryComponent', () => {
  let component: DisplayContractHistoryComponent;
  let fixture: ComponentFixture<DisplayContractHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayContractHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayContractHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
