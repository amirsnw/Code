import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeContComponent } from './income-cont.component';

describe('IncomeContComponent', () => {
  let component: IncomeContComponent;
  let fixture: ComponentFixture<IncomeContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
