import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageNoPresenceHeaderComponent } from './marriage-no-presence-header.component';

describe('HeaderComponent', () => {
  let component: MarriageNoPresenceHeaderComponent;
  let fixture: ComponentFixture<MarriageNoPresenceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageNoPresenceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageNoPresenceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
