import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitObjectionRequestComponent } from './sso-debit-objection-request.component';

describe('SsoDebitObjectionRequestComponent', () => {
  let component: SsoDebitObjectionRequestComponent;
  let fixture: ComponentFixture<SsoDebitObjectionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitObjectionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitObjectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
