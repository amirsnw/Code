import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFaqSearchComponent } from './request-faq-search.component';

describe('RequestFaqSearchComponent', () => {
  let component: RequestFaqSearchComponent;
  let fixture: ComponentFixture<RequestFaqSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFaqSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFaqSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
