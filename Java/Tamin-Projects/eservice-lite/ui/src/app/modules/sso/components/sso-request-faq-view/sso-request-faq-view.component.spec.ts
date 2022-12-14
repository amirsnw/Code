import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestFaqViewComponent } from './sso-request-faq-view.component';

describe('SsoRequestFaqViewComponent', () => {
  let component: SsoRequestFaqViewComponent;
  let fixture: ComponentFixture<SsoRequestFaqViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestFaqViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestFaqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
