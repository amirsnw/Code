import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPensionRequestViewComponent } from './pension-account-view.component';

describe('SsoPensionAccountViewComponent', () => {
  let component: SsoPensionRequestViewComponent;
  let fixture: ComponentFixture<SsoPensionRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPensionRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPensionRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
