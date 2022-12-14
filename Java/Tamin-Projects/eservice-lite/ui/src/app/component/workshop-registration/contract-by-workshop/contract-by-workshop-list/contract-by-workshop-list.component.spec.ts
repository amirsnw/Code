import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractByWorkshopListComponent } from './contract-by-workshop-list.component';

describe('ContractByWorkshopListComponent', () => {
  let component: ContractByWorkshopListComponent;
  let fixture: ComponentFixture<ContractByWorkshopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractByWorkshopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractByWorkshopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
