import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployerEservicesAgreementComponent} from './employer-eservices-agreement.component';

describe('SpecialInsuredContractComponent', () => {
  let component: EmployerEservicesAgreementComponent;
  let fixture: ComponentFixture<EmployerEservicesAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerEservicesAgreementComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEservicesAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
