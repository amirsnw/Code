import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSelfInquiryListComponent } from './pension-self-inquiry-list.component';

describe('PensionSelfInquiryListComponent', () => {
  let component: PensionSelfInquiryListComponent;
  let fixture: ComponentFixture<PensionSelfInquiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionSelfInquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionSelfInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
