import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSubdominantSearchComponent } from './sso-subdominant-search.component';

describe('SsoSubdominantSearchComponent', () => {
  let component: SsoSubdominantSearchComponent;
  let fixture: ComponentFixture<SsoSubdominantSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSubdominantSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSubdominantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
