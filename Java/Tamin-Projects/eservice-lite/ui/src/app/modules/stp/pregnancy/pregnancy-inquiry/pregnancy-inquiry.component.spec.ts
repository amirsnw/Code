import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyInquiryComponent } from './pregnancy-inquiry.component';

describe('PregnancyInquiryComponent', () => {
  let component: PregnancyInquiryComponent;
  let fixture: ComponentFixture<PregnancyInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnancyInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
