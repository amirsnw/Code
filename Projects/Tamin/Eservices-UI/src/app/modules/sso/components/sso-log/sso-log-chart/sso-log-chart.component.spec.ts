import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoLogChartComponent } from './sso-log-chart.component';

describe('SsoLogChartComponent', () => {
  let component: SsoLogChartComponent;
  let fixture: ComponentFixture<SsoLogChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoLogChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoLogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
