import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionFollowComponent } from './objection-follow.component';

describe('ObjectionFollowComponent', () => {
  let component: ObjectionFollowComponent;
  let fixture: ComponentFixture<ObjectionFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
