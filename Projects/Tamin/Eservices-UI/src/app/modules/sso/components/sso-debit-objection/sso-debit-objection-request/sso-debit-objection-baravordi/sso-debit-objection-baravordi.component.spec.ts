import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitObjectionBaravordiComponent } from './sso-debit-objection-baravordi.component';

describe('SsoDebitObjectionBaravordiComponent', () => {
  let component: SsoDebitObjectionBaravordiComponent;
  let fixture: ComponentFixture<SsoDebitObjectionBaravordiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitObjectionBaravordiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitObjectionBaravordiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
