import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionDebitNewComponent } from './objection-debit-new.component';

describe('ObjectionDebitNewComponent', () => {
  let component: ObjectionDebitNewComponent;
  let fixture: ComponentFixture<ObjectionDebitNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionDebitNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionDebitNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
