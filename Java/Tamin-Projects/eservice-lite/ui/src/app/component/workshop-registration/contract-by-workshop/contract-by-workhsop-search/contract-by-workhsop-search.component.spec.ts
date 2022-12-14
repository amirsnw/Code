import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractByWorkhsopSearchComponent } from './contract-by-workhsop-search.component';

describe('ContractByWorkhsopSearchComponent', () => {
  let component: ContractByWorkhsopSearchComponent;
  let fixture: ComponentFixture<ContractByWorkhsopSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractByWorkhsopSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractByWorkhsopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
