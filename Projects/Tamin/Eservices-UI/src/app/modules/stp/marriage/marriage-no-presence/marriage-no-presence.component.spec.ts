import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageNoPresenceComponent } from './marriage-no-presence.component';

describe('MarriageNoPresenceComponent', () => {
  let component: MarriageNoPresenceComponent;
  let fixture: ComponentFixture<MarriageNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
