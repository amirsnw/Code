import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractByWorkshopComponent } from './contract-by-workshop.component';

describe('ContractByWorkshopComponent', () => {
  let component: ContractByWorkshopComponent;
  let fixture: ComponentFixture<ContractByWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractByWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractByWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
