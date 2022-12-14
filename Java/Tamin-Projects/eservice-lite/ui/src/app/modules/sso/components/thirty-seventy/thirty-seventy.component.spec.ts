import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirtySeventyComponent } from './thirty-seventy.component';

describe('ThirtySeventyComponent', () => {
  let component: ThirtySeventyComponent;
  let fixture: ComponentFixture<ThirtySeventyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirtySeventyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirtySeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
