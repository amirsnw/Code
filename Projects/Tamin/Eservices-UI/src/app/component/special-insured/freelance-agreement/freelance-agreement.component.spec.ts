import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FreelanceAgreementComponent } from './freelance-agreement.component';

describe('FreelanceAgreementComponent', () => {
  let component: FreelanceAgreementComponent;
  let fixture: ComponentFixture<FreelanceAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
