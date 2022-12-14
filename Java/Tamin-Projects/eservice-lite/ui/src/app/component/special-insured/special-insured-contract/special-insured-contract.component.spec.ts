import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SpecialInsuredContractComponent} from './special-insured-contract.component';

describe('SpecialInsuredContractComponent', () => {
  let component: SpecialInsuredContractComponent;
  let fixture: ComponentFixture<SpecialInsuredContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialInsuredContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialInsuredContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
