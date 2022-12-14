import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyReliefComponent } from './penalty-relief.component';

describe('PenaltyReliefComponent', () => {
  let component: PenaltyReliefComponent;
  let fixture: ComponentFixture<PenaltyReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyReliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
