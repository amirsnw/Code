import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainApproveComponent } from './subdomain-approve.component';

describe('SubdomainApproveComponent', () => {
  let component: SubdomainApproveComponent;
  let fixture: ComponentFixture<SubdomainApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomainApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
