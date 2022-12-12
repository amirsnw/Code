import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletCartComponent } from './booklet-cart.component';

describe('BookletCartComponent', () => {
  let component: BookletCartComponent;
  let fixture: ComponentFixture<BookletCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
