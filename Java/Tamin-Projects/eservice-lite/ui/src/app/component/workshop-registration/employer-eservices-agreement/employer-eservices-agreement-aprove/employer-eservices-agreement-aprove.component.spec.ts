import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployerEservicesAgreementAproveComponent} from './employer-eservices-agreement-aprove.component';

describe('EmployerEservicesAgreementAproveComponent', () => {
  let component: EmployerEservicesAgreementAproveComponent;
  let fixture: ComponentFixture<EmployerEservicesAgreementAproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerEservicesAgreementAproveComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEservicesAgreementAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
