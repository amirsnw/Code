import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFaqComponent } from './request-faq.component';

describe('RequestFaqComponent', () => {
  let component: RequestFaqComponent;
  let fixture: ComponentFixture<RequestFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
