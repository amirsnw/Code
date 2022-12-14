import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictComponent } from './sso-edict.component';

describe('SsoEdictComponent', () => {
  let component: SsoEdictComponent;
  let fixture: ComponentFixture<SsoEdictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
