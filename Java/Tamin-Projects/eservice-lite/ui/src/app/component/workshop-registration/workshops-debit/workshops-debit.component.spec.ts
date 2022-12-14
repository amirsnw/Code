import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsDebitComponent } from './workshops-debit.component';

describe('WorkshopsDebitComponent', () => {
  let component: WorkshopsDebitComponent;
  let fixture: ComponentFixture<WorkshopsDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
