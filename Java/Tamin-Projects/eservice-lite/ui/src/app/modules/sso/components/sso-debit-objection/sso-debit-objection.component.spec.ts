import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitObjectionComponent } from './sso-debit-objection.component';

describe('SsoDebitObjectionComponent', () => {
  let component: SsoDebitObjectionComponent;
  let fixture: ComponentFixture<SsoDebitObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitObjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
