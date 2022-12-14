import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPropertyRegistrationComponent } from './register-property-registration.component';

describe('RegisterPropertyRegistrationComponent', () => {
  let component: RegisterPropertyRegistrationComponent;
  let fixture: ComponentFixture<RegisterPropertyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPropertyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPropertyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
