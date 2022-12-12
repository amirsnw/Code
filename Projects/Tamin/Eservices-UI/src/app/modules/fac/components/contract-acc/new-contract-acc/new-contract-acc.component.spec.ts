import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContractAccComponent } from './new-contract-acc.component';

describe('NewContractAccComponent', () => {
  let component: NewContractAccComponent;
  let fixture: ComponentFixture<NewContractAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewContractAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContractAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
