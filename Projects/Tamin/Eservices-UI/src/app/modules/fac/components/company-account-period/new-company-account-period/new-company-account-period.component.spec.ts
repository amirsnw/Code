import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyAccountPeriodComponent } from './new-company-account-period.component';

describe('NewCompanyAccountPeriodComponent', () => {
  let component: NewCompanyAccountPeriodComponent;
  let fixture: ComponentFixture<NewCompanyAccountPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyAccountPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyAccountPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
