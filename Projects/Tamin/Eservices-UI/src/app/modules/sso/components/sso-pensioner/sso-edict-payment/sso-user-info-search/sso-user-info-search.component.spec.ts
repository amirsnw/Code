import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoUserInfoSearchComponent } from './sso-user-info-search.component';

describe('SsoUserInfoSearchComponent', () => {
  let component: SsoUserInfoSearchComponent;
  let fixture: ComponentFixture<SsoUserInfoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoUserInfoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoUserInfoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
