import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementStatisticsComponent } from './announcement-statistics.component';

describe('AnnouncementStatisticsComponent', () => {
  let component: AnnouncementStatisticsComponent;
  let fixture: ComponentFixture<AnnouncementStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
