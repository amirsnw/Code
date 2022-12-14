import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredStatusSearchComponent } from './insured-status-search.component';

describe('InsuredStatusSearchComponent', () => {
  let component: InsuredStatusSearchComponent;
  let fixture: ComponentFixture<InsuredStatusSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuredStatusSearchComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredStatusSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
