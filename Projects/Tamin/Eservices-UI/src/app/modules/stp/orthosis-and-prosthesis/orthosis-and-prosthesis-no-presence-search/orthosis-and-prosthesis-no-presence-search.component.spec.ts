import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthosisAndProsthesisNoPresenceSearchComponent } from './orthosis-and-prosthesis-no-presence-search.component';

describe('OrthosisAndProsthesisNoPresenceSearchComponent', () => {
  let component: OrthosisAndProsthesisNoPresenceSearchComponent;
  let fixture: ComponentFixture<OrthosisAndProsthesisNoPresenceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthosisAndProsthesisNoPresenceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthosisAndProsthesisNoPresenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
