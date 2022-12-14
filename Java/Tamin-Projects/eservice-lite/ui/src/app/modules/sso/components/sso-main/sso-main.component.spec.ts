import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoMainComponent } from './sso-main.component';

describe('SsoMainComponent', () => {
  let component: SsoMainComponent;
  let fixture: ComponentFixture<SsoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
