import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasPhotoStepComponent } from './has-photo-step.component';

describe('HasPhotoStepComponent', () => {
  let component: HasPhotoStepComponent;
  let fixture: ComponentFixture<HasPhotoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasPhotoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasPhotoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
