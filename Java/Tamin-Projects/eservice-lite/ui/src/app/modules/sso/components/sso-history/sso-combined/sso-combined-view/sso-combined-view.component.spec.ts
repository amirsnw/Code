import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SsoCombinedViewComponent } from './sso-combined-view.component';

describe('SsoCombinedViewComponent', () => {
  let component: SsoCombinedViewComponent;
  let fixture: ComponentFixture<SsoCombinedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCombinedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCombinedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
