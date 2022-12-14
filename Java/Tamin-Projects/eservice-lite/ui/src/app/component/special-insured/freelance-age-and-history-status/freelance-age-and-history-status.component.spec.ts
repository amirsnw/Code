import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelanceAgeAndHistoryStatusComponent} from './freelance-age-and-history-status.component';

describe('FreelanceAgeAndHistoryStatusComponent', () => {
  let component: FreelanceAgeAndHistoryStatusComponent;
  let fixture: ComponentFixture<FreelanceAgeAndHistoryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceAgeAndHistoryStatusComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceAgeAndHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
