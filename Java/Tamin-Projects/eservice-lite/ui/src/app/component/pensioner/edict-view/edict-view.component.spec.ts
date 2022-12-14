import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictViewComponent } from './edict-view.component';

describe('EdictViewComponent', () => {
  let component: EdictViewComponent;
  let fixture: ComponentFixture<EdictViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
