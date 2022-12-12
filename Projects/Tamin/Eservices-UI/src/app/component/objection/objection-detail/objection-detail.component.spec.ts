import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionDetailComponent } from './objection-detail.component';

describe('ObjectionDetailComponent', () => {
  let component: ObjectionDetailComponent;
  let fixture: ComponentFixture<ObjectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
