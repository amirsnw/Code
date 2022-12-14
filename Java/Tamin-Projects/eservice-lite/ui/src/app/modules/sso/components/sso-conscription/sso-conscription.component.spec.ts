import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoConscriptionComponent } from './sso-conscription.component';

describe('ConscriptionComponent', () => {
  let component: SsoConscriptionComponent;
  let fixture: ComponentFixture<SsoConscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoConscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoConscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
