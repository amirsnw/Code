import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AgeAndHistoryStatusComponent} from './age-and-history-status.component';

describe('AgeAndHistoryStatusComponent', () => {
  let component: AgeAndHistoryStatusComponent;
  let fixture: ComponentFixture<AgeAndHistoryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeAndHistoryStatusComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeAndHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
