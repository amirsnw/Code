import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistrationContainerComponent } from './employee-registration-container.component';

describe('EmployeeRegistrationContainerComponent', () => {
  let component: EmployeeRegistrationContainerComponent;
  let fixture: ComponentFixture<EmployeeRegistrationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRegistrationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegistrationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
