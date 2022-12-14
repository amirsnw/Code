import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FractionAgreementComponent } from './fraction-agreement.component';

describe('FractionAgreementComponent', () => {
  let component: FractionAgreementComponent;
  let fixture: ComponentFixture<FractionAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
