import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSpecificPersonComponent } from './sso-specific-person.component';

describe('SsoEdictComponent', () => {
  let component: SsoSpecificPersonComponent;
  let fixture: ComponentFixture<SsoSpecificPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSpecificPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSpecificPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
