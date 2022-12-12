import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployerEservicesAgreementInsuredInfoComponent} from './employer-eservices-agreement-insured-info.component';

describe('EmployerEservicesAgreementInsuredInfoComponent', () => {
  let component: EmployerEservicesAgreementInsuredInfoComponent;
  let fixture: ComponentFixture<EmployerEservicesAgreementInsuredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerEservicesAgreementInsuredInfoComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEservicesAgreementInsuredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
