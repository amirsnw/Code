import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAccComponent } from './contract-acc.component';

describe('ContractAccComponent', () => {
  let component: ContractAccComponent;
  let fixture: ComponentFixture<ContractAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
