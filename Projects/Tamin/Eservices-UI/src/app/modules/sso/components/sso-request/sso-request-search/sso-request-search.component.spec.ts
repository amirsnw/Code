import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestSearchComponent } from './sso-request-search.component';

describe('SsoRequestSearchComponent', () => {
  let component: SsoRequestSearchComponent;
  let fixture: ComponentFixture<SsoRequestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
