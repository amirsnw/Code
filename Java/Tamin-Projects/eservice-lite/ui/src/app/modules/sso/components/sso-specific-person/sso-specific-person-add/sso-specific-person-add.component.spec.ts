import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSpecificPersonAddComponent } from './sso-specific-person-add.component';

describe('SsoSpecificPersonAddComponent', () => {
  let component: SsoSpecificPersonAddComponent;
  let fixture: ComponentFixture<SsoSpecificPersonAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSpecificPersonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSpecificPersonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
