import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionDisplayContractComponent } from './fraction-display-contract.component';

describe('FractionDisplayContractComponent', () => {
  let component: FractionDisplayContractComponent;
  let fixture: ComponentFixture<FractionDisplayContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionDisplayContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionDisplayContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
