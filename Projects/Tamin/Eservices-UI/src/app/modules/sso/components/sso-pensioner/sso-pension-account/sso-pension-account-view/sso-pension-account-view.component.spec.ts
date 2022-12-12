import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPensionAccountViewComponent } from './sso-pension-account-view.component';

describe('SsoPensionAccountViewComponent', () => {
  let component: SsoPensionAccountViewComponent;
  let fixture: ComponentFixture<SsoPensionAccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPensionAccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPensionAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
