import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestComponent } from './sso-request.component';

describe('SsoRequestComponent', () => {
  let component: SsoRequestComponent;
  let fixture: ComponentFixture<SsoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
