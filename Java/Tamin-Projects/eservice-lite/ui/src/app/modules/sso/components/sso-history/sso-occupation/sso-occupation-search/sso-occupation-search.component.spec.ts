import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCombinedSearchComponent } from './sso-combined-search.component';

describe('SsoCombinedSearchComponent', () => {
  let component: SsoCombinedSearchComponent;
  let fixture: ComponentFixture<SsoCombinedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsoCombinedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCombinedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
