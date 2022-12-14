import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialAgreementComponent } from './special-agreement.component';

describe('SpecialAgreementComponent', () => {
  let component: SpecialAgreementComponent;
  let fixture: ComponentFixture<SpecialAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
