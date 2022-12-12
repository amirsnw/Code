import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestDetailsComponent } from './sso-request-details.component';

describe('SsoRequestDetailsComponent', () => {
  let component: SsoRequestDetailsComponent;
  let fixture: ComponentFixture<SsoRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
