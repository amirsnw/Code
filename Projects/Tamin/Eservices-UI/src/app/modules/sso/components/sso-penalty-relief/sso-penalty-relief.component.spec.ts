import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPenaltyReliefComponent } from './sso-penalty-relief.component';

describe('SsoPenaltyReliefComponent', () => {
  let component: SsoPenaltyReliefComponent;
  let fixture: ComponentFixture<SsoPenaltyReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPenaltyReliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPenaltyReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
