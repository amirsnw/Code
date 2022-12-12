import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitObjectionBadviComponent } from './sso-debit-objection-badvi.component';

describe('SsoDebitObjectionBadviComponent', () => {
  let component: SsoDebitObjectionBadviComponent;
  let fixture: ComponentFixture<SsoDebitObjectionBadviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitObjectionBadviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitObjectionBadviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
