import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSalaryComponent } from './sso-salary.component';

describe('SsoSalaryComponent', () => {
  let component: SsoSalaryComponent;
  let fixture: ComponentFixture<SsoSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
