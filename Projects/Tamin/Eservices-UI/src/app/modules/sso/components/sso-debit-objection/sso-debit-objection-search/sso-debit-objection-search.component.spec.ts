import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoDebitObjectionSearchComponent } from './sso-debit-objection-search.component';

describe('SsoDebitObjectionSearchComponent', () => {
  let component: SsoDebitObjectionSearchComponent;
  let fixture: ComponentFixture<SsoDebitObjectionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoDebitObjectionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoDebitObjectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
