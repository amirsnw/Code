import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoWorkerModalComponent } from './display-info-worker-modal.component';

describe('DisplayInfoWorkerModalComponent', () => {
  let component: DisplayInfoWorkerModalComponent;
  let fixture: ComponentFixture<DisplayInfoWorkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInfoWorkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInfoWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
