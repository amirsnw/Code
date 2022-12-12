import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletDataComponent } from './booklet-data.component';

describe('BookletDataComponent', () => {
  let component: BookletDataComponent;
  let fixture: ComponentFixture<BookletDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
