import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletSearchComponent } from './booklet-search.component';

describe('BookletSearchComponent', () => {
  let component: BookletSearchComponent;
  let fixture: ComponentFixture<BookletSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
