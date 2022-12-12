import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainNewComponent } from './subdomain-new.component';

describe('SubdomainNewComponent', () => {
  let component: SubdomainNewComponent;
  let fixture: ComponentFixture<SubdomainNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomainNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
