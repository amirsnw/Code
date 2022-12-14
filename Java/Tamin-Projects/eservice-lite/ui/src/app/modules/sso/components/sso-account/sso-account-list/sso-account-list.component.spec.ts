import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAccountListComponent } from './sso-account-list.component';

describe('SsoAccountListComponent', () => {
  let component: SsoAccountListComponent;
  let fixture: ComponentFixture<SsoAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
