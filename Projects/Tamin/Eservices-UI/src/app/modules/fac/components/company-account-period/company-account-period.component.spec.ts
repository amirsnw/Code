import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountPeriodComponent } from './company-account-period.component';

describe('CompanyAccountPeriodComponent', () => {
  let component: CompanyAccountPeriodComponent;
  let fixture: ComponentFixture<CompanyAccountPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
