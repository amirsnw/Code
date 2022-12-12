import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthosisAndProsthesisNoPresenceHeaderComponent } from './orthosis-and-prosthesis-no-presence-header.component';

describe('OrthosisAndProsthesisNoPresenceHeaderComponent', () => {
  let component: OrthosisAndProsthesisNoPresenceHeaderComponent;
  let fixture: ComponentFixture<OrthosisAndProsthesisNoPresenceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthosisAndProsthesisNoPresenceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthosisAndProsthesisNoPresenceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
