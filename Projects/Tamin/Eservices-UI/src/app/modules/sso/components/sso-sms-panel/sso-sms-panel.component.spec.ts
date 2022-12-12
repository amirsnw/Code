import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSmsPanelComponent } from './sso-sms-panel.component';

describe('SsoSmsPanelComponent', () => {
  let component: SsoSmsPanelComponent;
  let fixture: ComponentFixture<SsoSmsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSmsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSmsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
