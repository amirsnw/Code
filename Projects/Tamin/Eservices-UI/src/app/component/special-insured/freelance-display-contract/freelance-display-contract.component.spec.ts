import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceDisplayContractComponent } from './freelance-display-contract.component';

describe('FreelanceDisplayContractComponent', () => {
  let component: FreelanceDisplayContractComponent;
  let fixture: ComponentFixture<FreelanceDisplayContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceDisplayContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceDisplayContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
