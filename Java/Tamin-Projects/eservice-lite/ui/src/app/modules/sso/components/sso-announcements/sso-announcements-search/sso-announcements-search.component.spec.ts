import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoAnnouncementsSearchComponent } from './sso-announcements-search.component';

describe('SsoAnnouncementsSearchComponent', () => {
  let component: SsoAnnouncementsSearchComponent;
  let fixture: ComponentFixture<SsoAnnouncementsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoAnnouncementsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoAnnouncementsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
