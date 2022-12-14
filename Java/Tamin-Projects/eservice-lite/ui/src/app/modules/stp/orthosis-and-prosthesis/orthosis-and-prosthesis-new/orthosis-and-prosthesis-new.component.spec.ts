import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthosisAndProsthesisComponent } from "./marriage-new.component";

describe('MarriageNewComponent', () => {
  let component: OrthosisAndProsthesisComponent;
  let fixture: ComponentFixture<OrthosisAndProsthesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthosisAndProsthesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthosisAndProsthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
