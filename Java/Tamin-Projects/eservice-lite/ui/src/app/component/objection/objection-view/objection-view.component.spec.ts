import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionViewComponent } from './objection-view.component';

describe('ObjectionViewComponent', () => {
  let component: ObjectionViewComponent;
  let fixture: ComponentFixture<ObjectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
