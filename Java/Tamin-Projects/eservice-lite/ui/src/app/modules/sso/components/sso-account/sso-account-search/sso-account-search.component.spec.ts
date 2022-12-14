import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAccountSearchComponent } from './sso-account-search.component';

describe('SsoAccountSearchComponent', () => {
  let component: SsoAccountSearchComponent;
  let fixture: ComponentFixture<SsoAccountSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAccountSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
