import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainListComponent } from './subdomain-list.component';

describe('SubdomainListComponent', () => {
  let component: SubdomainListComponent;
  let fixture: ComponentFixture<SubdomainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
