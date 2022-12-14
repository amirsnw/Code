import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletNewComponent } from './booklet-new.component';

describe('BookletNewComponent', () => {
  let component: BookletNewComponent;
  let fixture: ComponentFixture<BookletNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
