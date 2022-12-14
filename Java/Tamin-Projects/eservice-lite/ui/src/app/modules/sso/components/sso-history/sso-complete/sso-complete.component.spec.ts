import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SsoCompleteComponent } from './sso-complete.component';

describe('SsoCompleteComponent', () => {
  let component: SsoCompleteComponent;
  let fixture: ComponentFixture<SsoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsoCompleteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
