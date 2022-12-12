import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionCheckIstrueContractComponent} from './fraction-check-istrue-contract.component';

describe('FractionCheckIstrueContractComponent', () => {
  let component: FractionCheckIstrueContractComponent;
  let fixture: ComponentFixture<FractionCheckIstrueContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionCheckIstrueContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionCheckIstrueContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
