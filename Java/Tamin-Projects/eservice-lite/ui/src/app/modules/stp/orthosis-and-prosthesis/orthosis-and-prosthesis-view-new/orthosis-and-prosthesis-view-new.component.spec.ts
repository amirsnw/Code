import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthosisAndProsthesisViewNewComponent } from './orthosis-and-prosthesis-view-new.component';

describe('OrthosisAndProsthesisViewNewComponent', () => {
  let component: OrthosisAndProsthesisViewNewComponent;
  let fixture: ComponentFixture<OrthosisAndProsthesisViewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthosisAndProsthesisViewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthosisAndProsthesisViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
