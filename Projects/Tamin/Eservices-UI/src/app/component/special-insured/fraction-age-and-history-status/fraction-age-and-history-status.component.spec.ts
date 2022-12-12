import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionAgeAndHistoryStatusComponent} from './fraction-age-and-history-status.component';

describe('FractionAgeAndHistoryStatusComponent', () => {
  let component: FractionAgeAndHistoryStatusComponent;
  let fixture: ComponentFixture<FractionAgeAndHistoryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionAgeAndHistoryStatusComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionAgeAndHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
