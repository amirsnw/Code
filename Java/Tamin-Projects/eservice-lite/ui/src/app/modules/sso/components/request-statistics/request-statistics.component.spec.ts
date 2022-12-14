import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatisticsComponent } from './request-statistics.component';

describe('RequestStatisticsComponent', () => {
  let component: RequestStatisticsComponent;
  let fixture: ComponentFixture<RequestStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
