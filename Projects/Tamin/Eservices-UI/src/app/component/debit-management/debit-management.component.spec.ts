import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitManagementComponent } from './debit-management.component';

describe('DebitManagementComponent', () => {
  let component: DebitManagementComponent;
  let fixture: ComponentFixture<DebitManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
