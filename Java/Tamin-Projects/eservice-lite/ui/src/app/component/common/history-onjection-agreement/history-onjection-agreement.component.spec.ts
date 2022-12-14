import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOnjectionAgreementComponent } from './history-onjection-agreement.component';

describe('HistoryOnjectionAgreementComponent', () => {
  let component: HistoryOnjectionAgreementComponent;
  let fixture: ComponentFixture<HistoryOnjectionAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOnjectionAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOnjectionAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
