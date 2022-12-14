import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSelfInquiryComponent } from './pension-self-inquiry.component';

describe('PensionSelfInquiryComponent', () => {
  let component: PensionSelfInquiryComponent;
  let fixture: ComponentFixture<PensionSelfInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionSelfInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionSelfInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
