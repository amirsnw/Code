import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopsDebitComponent } from './sso-workshops-debit.component';

describe('SsoWorkshopsDebitComponent', () => {
  let component: SsoWorkshopsDebitComponent;
  let fixture: ComponentFixture<SsoWorkshopsDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopsDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopsDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
