import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCompleteSearchComponent } from './sso-complete-search.component';

describe('EdictPaymentSearchComponent', () => {
  let component: SsoCompleteSearchComponent;
  let fixture: ComponentFixture<SsoCompleteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCompleteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCompleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
