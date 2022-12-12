import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PensionRequestCombinedHistoryComponent} from './pension-request-combined-history.component';

describe('PensionRequestCombinedHistoryComponent', () => {
  let component: PensionRequestCombinedHistoryComponent;
  let fixture: ComponentFixture<PensionRequestCombinedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionRequestCombinedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionRequestCombinedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


