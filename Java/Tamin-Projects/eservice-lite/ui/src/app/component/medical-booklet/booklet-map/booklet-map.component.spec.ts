import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookletMapComponent } from './booklet-map.component';

describe('BookletMapComponent', () => {
  let component: BookletMapComponent;
  let fixture: ComponentFixture<BookletMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookletMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookletMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
