import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFeedbackComponent } from './site-feedback.component';

describe('SiteFeedbackComponent', () => {
  let component: SiteFeedbackComponent;
  let fixture: ComponentFixture<SiteFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
