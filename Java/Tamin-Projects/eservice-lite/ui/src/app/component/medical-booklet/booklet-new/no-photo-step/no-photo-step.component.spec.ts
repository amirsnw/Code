import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPhotoStepComponent } from './no-photo-step.component';

describe('NoPhotoStepComponent', () => {
  let component: NoPhotoStepComponent;
  let fixture: ComponentFixture<NoPhotoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPhotoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPhotoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
