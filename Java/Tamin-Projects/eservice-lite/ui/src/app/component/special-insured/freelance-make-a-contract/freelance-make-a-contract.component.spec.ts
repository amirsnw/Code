import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelanceMakeAContractComponent} from './freelance-make-a-contract.component';

describe('FreelanceMakeAContractComponent', () => {
  let component: FreelanceMakeAContractComponent;
  let fixture: ComponentFixture<FreelanceMakeAContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceMakeAContractComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceMakeAContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
