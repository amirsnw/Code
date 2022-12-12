import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionResponseComponent } from './objection-response.component';

describe('ObjectionResponseComponent', () => {
  let component: ObjectionResponseComponent;
  let fixture: ComponentFixture<ObjectionResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
