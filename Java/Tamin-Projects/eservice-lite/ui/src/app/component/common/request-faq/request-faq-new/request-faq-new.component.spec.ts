import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFagNewComponent } from './request-fag-new.component';

describe('RequestFagNewComponent', () => {
  let component: RequestFagNewComponent;
  let fixture: ComponentFixture<RequestFagNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFagNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFagNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
