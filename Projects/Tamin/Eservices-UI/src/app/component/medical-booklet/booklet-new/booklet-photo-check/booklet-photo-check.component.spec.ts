import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletPhotoCheckComponent } from './booklet-photo-check.component';

describe('BookletPhotoCheckComponent', () => {
  let component: BookletPhotoCheckComponent;
  let fixture: ComponentFixture<BookletPhotoCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletPhotoCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletPhotoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
