import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionBadviNewComponent } from './objection-badvi-new.component';

describe('ObjectionBadviNewComponent', () => {
  let component: ObjectionBadviNewComponent;
  let fixture: ComponentFixture<ObjectionBadviNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionBadviNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionBadviNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
