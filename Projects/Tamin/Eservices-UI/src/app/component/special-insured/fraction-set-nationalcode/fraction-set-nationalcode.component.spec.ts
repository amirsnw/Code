import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionSetNationalcodeComponent} from './fraction-set-nationalcode.component';

describe('SpecialInsuredContractComponent', () => {
  let component: FractionSetNationalcodeComponent;
  let fixture: ComponentFixture<FractionSetNationalcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionSetNationalcodeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionSetNationalcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
