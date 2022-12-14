import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoLogStatisticsComponent } from './sso-log-statistics.component';

describe('SsoLogStatisticsComponent', () => {
  let component: SsoLogStatisticsComponent;
  let fixture: ComponentFixture<SsoLogStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoLogStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoLogStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
