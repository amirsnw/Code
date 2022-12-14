import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSsoLocationComponent } from './search-sso-location.component';

describe('SearchSsoLocationComponent', () => {
  let component: SearchSsoLocationComponent;
  let fixture: ComponentFixture<SearchSsoLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSsoLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSsoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
