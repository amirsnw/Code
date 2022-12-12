import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPensionAccountComponent } from './sso-pension-account.component';

describe('SsoPensionAccountComponent', () => {
  let component: SsoPensionAccountComponent;
  let fixture: ComponentFixture<SsoPensionAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPensionAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPensionAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
