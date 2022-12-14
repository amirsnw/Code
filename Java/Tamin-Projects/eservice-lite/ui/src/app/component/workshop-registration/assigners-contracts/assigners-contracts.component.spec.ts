import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignersContractsComponent } from './assigners-contracts.component';

describe('AssignersContractsComponent', () => {
  let component: AssignersContractsComponent;
  let fixture: ComponentFixture<AssignersContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignersContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignersContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
