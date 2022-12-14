import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionMakeAContractComponent} from './fraction-make-a-contract.component';

describe('MakeAContractComponent', () => {
  let component: FractionMakeAContractComponent;
  let fixture: ComponentFixture<FractionMakeAContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionMakeAContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionMakeAContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
