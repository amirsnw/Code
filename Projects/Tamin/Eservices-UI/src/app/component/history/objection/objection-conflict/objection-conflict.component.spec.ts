import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionConflictComponent } from './objection-conflict.component';

describe('ObjectionConflictComponent', () => {
  let component: ObjectionConflictComponent;
  let fixture: ComponentFixture<ObjectionConflictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionConflictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
