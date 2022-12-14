import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageNoPresenceSearchComponent } from './marriage-no-presence-search.component';

describe('EdictPaymentSearchComponent', () => {
  let component: MarriageNoPresenceSearchComponent;
  let fixture: ComponentFixture<MarriageNoPresenceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageNoPresenceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageNoPresenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
