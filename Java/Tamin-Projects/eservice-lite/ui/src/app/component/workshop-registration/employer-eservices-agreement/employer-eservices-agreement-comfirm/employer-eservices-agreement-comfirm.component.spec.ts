import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerEservicesAgreementComfirmComponent } from './employer-eservices-agreement-comfirm.component';

describe('EmployerEservicesAgreementComfirmComponent', () => {
  let component: EmployerEservicesAgreementComfirmComponent;
  let fixture: ComponentFixture<EmployerEservicesAgreementComfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerEservicesAgreementComfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEservicesAgreementComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
