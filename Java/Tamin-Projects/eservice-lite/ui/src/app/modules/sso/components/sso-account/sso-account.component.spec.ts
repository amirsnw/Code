import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAccountComponent } from './sso-account.component';

describe('SsoAccountComponent', () => {
  let component: SsoAccountComponent;
  let fixture: ComponentFixture<SsoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
