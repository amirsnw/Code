import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedSearchComponent } from './combined-search.component';

describe('CombinedSearchComponent', () => {
  let component: CombinedSearchComponent;
  let fixture: ComponentFixture<CombinedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CombinedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
