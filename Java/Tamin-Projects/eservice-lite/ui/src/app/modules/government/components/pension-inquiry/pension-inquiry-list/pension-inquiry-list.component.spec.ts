import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionInquiryListComponent } from './pension-inquiry-list.component';

describe('PensionInquiryListComponent', () => {
  let component: PensionInquiryListComponent;
  let fixture: ComponentFixture<PensionInquiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionInquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
