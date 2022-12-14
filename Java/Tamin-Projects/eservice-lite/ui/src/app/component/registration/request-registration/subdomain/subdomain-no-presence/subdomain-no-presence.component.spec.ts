import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainNoPresenceComponent } from './subdomain-NoPresence.component';

describe('SubdomainNoPresenceComponent', () => {
  let component: SubdomainNoPresenceComponent;
  let fixture: ComponentFixture<SubdomainNoPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainNoPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomainNoPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
