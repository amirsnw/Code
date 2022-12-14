import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionDebitComponent } from './objection-debit.component';

describe('ObjectionDebitComponent', () => {
  let component: ObjectionDebitComponent;
  let fixture: ComponentFixture<ObjectionDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
