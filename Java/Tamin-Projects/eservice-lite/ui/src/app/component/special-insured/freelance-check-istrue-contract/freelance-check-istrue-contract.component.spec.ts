import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelanceCheckIstrueContractComponent} from './freelance-check-istrue-contract.component';

describe('FreelanceCheckIstrueContractComponent', () => {
  let component: FreelanceCheckIstrueContractComponent;
  let fixture: ComponentFixture<FreelanceCheckIstrueContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceCheckIstrueContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceCheckIstrueContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
