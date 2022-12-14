import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageConditionsNoPresenceComponent } from './marriage-conditions-no-presence.component';

describe('MarriageConditionsNoPresenceComponent', () => {
  let component: MarriageConditionsNoPresenceComponent;
  let fixture: ComponentFixture<MarriageConditionsNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageConditionsNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageConditionsNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
