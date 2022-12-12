import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployerEservicesAgreementAproveDisplayComponent} from './employer-eservices-agreement-aprove-display.component';

describe('EmployerEservicesAgreementAproveDisplayComponent', () => {
  let component: EmployerEservicesAgreementAproveDisplayComponent;
  let fixture: ComponentFixture<EmployerEservicesAgreementAproveDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerEservicesAgreementAproveDisplayComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEservicesAgreementAproveDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
