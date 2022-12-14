import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNoPresenceComponent } from './funeral-no-presence.component';

describe('FuneralComponent', () => {
  let component: FuneralNoPresenceComponent;
  let fixture: ComponentFixture<FuneralNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
