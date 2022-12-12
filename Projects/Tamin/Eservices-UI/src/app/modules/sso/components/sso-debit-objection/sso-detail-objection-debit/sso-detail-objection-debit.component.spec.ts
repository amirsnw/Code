import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDetailObjectionDebitComponent } from './sso-detail-objection-debit.component';

describe('SsoDetailObjectionDebitComponent', () => {
  let component: SsoDetailObjectionDebitComponent;
  let fixture: ComponentFixture<SsoDetailObjectionDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDetailObjectionDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDetailObjectionDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
