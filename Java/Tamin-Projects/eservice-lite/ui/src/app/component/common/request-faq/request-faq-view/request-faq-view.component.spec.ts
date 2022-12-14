import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFaqViewComponent } from './request-faq-view.component';

describe('RequestFaqViewComponent', () => {
  let component: RequestFaqViewComponent;
  let fixture: ComponentFixture<RequestFaqViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFaqViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFaqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
