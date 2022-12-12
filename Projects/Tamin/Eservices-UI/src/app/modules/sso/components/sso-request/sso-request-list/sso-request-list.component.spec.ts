import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRequestListComponent } from './sso-request-list.component';

describe('SsoRequestListComponent', () => {
  let component: SsoRequestListComponent;
  let fixture: ComponentFixture<SsoRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
