import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorModalComponent } from './display-error-modal.component';

describe('DisplayErrorModalComponent', () => {
  let component: DisplayErrorModalComponent;
  let fixture: ComponentFixture<DisplayErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayErrorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
