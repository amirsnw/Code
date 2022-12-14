import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletListComponent } from './booklet-list.component';

describe('BookletListComponent', () => {
  let component: BookletListComponent;
  let fixture: ComponentFixture<BookletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
