import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementSsoComponent } from './announcement-sso.component';

describe('AnnouncementSsoComponent', () => {
  let component: AnnouncementSsoComponent;
  let fixture: ComponentFixture<AnnouncementSsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementSsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
