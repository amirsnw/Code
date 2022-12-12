import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageNoPresenceMenuComponent } from './marriage-no-presence-menu.component';

describe('MarriageNoPresenceMenuComponent', () => {
  let component: MarriageNoPresenceMenuComponent;
  let fixture: ComponentFixture<MarriageNoPresenceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageNoPresenceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageNoPresenceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
