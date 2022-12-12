import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAnnouncementsComponent } from './sso-announcements.component';

describe('SsoAnnouncementsComponent', () => {
  let component: SsoAnnouncementsComponent;
  let fixture: ComponentFixture<SsoAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
