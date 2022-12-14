import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSalaryListComponent } from './sso-salary-list.component';

describe('SsoSalaryListComponent', () => {
  let component: SsoSalaryListComponent;
  let fixture: ComponentFixture<SsoSalaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSalaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
