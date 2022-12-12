import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemnityInquiryComponent } from './indemnity-inquiry.component';

describe('IndemnityInquiryComponent', () => {
  let component: IndemnityInquiryComponent;
  let fixture: ComponentFixture<IndemnityInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndemnityInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndemnityInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
