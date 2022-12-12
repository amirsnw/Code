import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionNotexistComponent } from './objection-notexist.component';

describe('ObjectionNotexistComponent', () => {
  let component: ObjectionNotexistComponent;
  let fixture: ComponentFixture<ObjectionNotexistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionNotexistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionNotexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
