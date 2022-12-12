import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredStatusListComponent } from './insured-status-list.component';

describe('InsuredStatusListComponent', () => {
  let component: InsuredStatusListComponent;
  let fixture: ComponentFixture<InsuredStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
