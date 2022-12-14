import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FractionOftheMoonContractComponent} from './fraction-ofthe-moon-contract.component';

describe('SpecialInsuredContractComponent', () => {
  let component: FractionOftheMoonContractComponent;
  let fixture: ComponentFixture<FractionOftheMoonContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionOftheMoonContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionOftheMoonContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
