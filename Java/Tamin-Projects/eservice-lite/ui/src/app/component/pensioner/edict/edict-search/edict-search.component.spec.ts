import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictSearchComponent } from './edict-search.component';

describe('EdictSearchComponent', () => {
  let component: EdictSearchComponent;
  let fixture: ComponentFixture<EdictSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
