import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestResponseComponent } from './sso-request-response.component';

describe('SsoRequestResponseComponent', () => {
  let component: SsoRequestResponseComponent;
  let fixture: ComponentFixture<SsoRequestResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
