import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetRequestAuditorsComponent } from './det-request-auditors.component';

describe('DetRequestAuditorsComponent', () => {
  let component: DetRequestAuditorsComponent;
  let fixture: ComponentFixture<DetRequestAuditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetRequestAuditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetRequestAuditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
