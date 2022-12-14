import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSalaryViewComponent } from './sso-salary-view.component';

describe('SsoSalaryViewComponent', () => {
  let component: SsoSalaryViewComponent;
  let fixture: ComponentFixture<SsoSalaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSalaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSalaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
