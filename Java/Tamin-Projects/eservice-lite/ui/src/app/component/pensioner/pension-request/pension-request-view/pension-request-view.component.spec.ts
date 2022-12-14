import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionRequestViewComponent } from './pension-request-view.component';

describe('SsoPensionRequestViewComponent', () => {
  let component: PensionRequestViewComponent;
  let fixture: ComponentFixture<PensionRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
