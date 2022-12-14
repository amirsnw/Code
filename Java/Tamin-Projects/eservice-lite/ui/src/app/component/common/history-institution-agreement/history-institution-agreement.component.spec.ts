import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInstitutionAgreementComponent } from './history-institution-agreement.component';

describe('AgreementComponent', () => {
  let component: HistoryInstitutionAgreementComponent;
  let fixture: ComponentFixture<HistoryInstitutionAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryInstitutionAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryInstitutionAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
