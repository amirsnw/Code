import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionInquirySearchComponent } from './pension-inquiry-search.component';

describe('PensionInquirySearchComponent', () => {
  let component: PensionInquirySearchComponent;
  let fixture: ComponentFixture<PensionInquirySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionInquirySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionInquirySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
