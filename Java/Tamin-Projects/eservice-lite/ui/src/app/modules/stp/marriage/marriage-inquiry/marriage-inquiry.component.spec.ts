import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageInquiryComponent } from './marriage-inquiry.component';

describe('MarriageInquiryComponent', () => {
  let component: MarriageInquiryComponent;
  let fixture: ComponentFixture<MarriageInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
