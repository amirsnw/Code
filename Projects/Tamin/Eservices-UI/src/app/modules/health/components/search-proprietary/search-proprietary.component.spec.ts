import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProprietaryComponent } from './search-proprietary.component';

describe('SearchProprietaryComponent', () => {
  let component: SearchProprietaryComponent;
  let fixture: ComponentFixture<SearchProprietaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProprietaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProprietaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
