import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPensionFinalResultComponent } from './sso-pension-final-result.component';

describe('SsoPensionFinalResultComponent', () => {
  let component: SsoPensionFinalResultComponent;
  let fixture: ComponentFixture<SsoPensionFinalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPensionFinalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPensionFinalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
