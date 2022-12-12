import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFormFileDisplayedComponent } from './load-form-file-displayed.component';

describe('LoadFormFileDisplayedComponent', () => {
  let component: LoadFormFileDisplayedComponent;
  let fixture: ComponentFixture<LoadFormFileDisplayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFormFileDisplayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFormFileDisplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
