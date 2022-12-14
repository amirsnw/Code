import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetRequestAuditorsComponent } from './new-det-request-auditors.component';

describe('NewDetRequestAuditorsComponent', () => {
  let component: NewDetRequestAuditorsComponent;
  let fixture: ComponentFixture<NewDetRequestAuditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDetRequestAuditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDetRequestAuditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
