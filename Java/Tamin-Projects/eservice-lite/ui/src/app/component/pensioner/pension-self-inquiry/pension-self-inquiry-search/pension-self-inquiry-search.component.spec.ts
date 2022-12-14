import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSelfInquirySearchComponent } from './pension-self-inquiry-search.component';

describe('PensionSelfInquirySearchComponent', () => {
  let component: PensionSelfInquirySearchComponent;
  let fixture: ComponentFixture<PensionSelfInquirySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionSelfInquirySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionSelfInquirySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
