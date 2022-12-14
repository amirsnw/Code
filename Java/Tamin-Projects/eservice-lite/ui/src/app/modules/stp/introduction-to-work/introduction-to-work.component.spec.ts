import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionToWorkComponent } from './introduction-to-work.component';

describe('IntroductionToWorkComponent', () => {
  let component: IntroductionToWorkComponent;
  let fixture: ComponentFixture<IntroductionToWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionToWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionToWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
