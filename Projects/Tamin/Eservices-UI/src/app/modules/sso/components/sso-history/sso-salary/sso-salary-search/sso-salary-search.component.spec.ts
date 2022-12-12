import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSalarySearchComponent } from './sso-salary-search.component';

describe('SsoSalarySearchComponent', () => {
  let component: SsoSalarySearchComponent;
  let fixture: ComponentFixture<SsoSalarySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSalarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSalarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
