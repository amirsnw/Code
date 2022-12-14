import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDisplayContractComponent } from './special-display-contract.component';

describe('SpecialDisplayContractComponent', () => {
  let component: SpecialDisplayContractComponent;
  let fixture: ComponentFixture<SpecialDisplayContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDisplayContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDisplayContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
