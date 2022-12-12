import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncomeContComponent } from './new-income-cont.component';

describe('NewIncomeContComponent', () => {
  let component: NewIncomeContComponent;
  let fixture: ComponentFixture<NewIncomeContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncomeContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIncomeContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
