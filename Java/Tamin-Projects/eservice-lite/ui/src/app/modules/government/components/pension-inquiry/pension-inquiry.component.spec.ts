import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionInquiryComponent } from './pension-inquiry.component';

describe('PensionInquiryComponent', () => {
  let component: PensionInquiryComponent;
  let fixture: ComponentFixture<PensionInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
