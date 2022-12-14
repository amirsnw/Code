import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletOrderComponent } from './booklet-order.component';

describe('BookletOrderComponent', () => {
  let component: BookletOrderComponent;
  let fixture: ComponentFixture<BookletOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
