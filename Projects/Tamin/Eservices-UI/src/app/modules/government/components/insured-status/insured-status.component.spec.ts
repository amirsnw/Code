import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredStatusComponent } from './insured-status.component';

describe('InsuredStatusComponent', () => {
  let component: InsuredStatusComponent;
  let fixture: ComponentFixture<InsuredStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
