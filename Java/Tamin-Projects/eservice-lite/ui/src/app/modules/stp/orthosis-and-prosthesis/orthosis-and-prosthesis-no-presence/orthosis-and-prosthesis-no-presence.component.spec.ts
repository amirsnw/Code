import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthosisAndProsthesisNoPresenceComponent } from './orthosis-and-prosthesis-no-presence.component';

describe('OrthosisAndProsthesisNoPresenceComponent', () => {
  let component: OrthosisAndProsthesisNoPresenceComponent;
  let fixture: ComponentFixture<OrthosisAndProsthesisNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthosisAndProsthesisNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthosisAndProsthesisNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
