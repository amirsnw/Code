import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpHeaderFuneralNoPresenceComponent } from './stp-header-funeral-no-presence.component';

describe('HeaderComponent', () => {
  let component: StpHeaderFuneralNoPresenceComponent;
  let fixture: ComponentFixture<StpHeaderFuneralNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpHeaderFuneralNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpHeaderFuneralNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
