import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionNotexistNewEditComponent } from './objection-notexist-new-edit.component';

describe('ObjectionNotexistNewComponent', () => {
  let component: ObjectionNotexistNewEditComponent;
  let fixture: ComponentFixture<ObjectionNotexistNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionNotexistNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionNotexistNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
