import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoEdictSearchComponent } from './sso-edict-search.component';

describe('SsoEdictSearchComponent', () => {
  let component: SsoEdictSearchComponent;
  let fixture: ComponentFixture<SsoEdictSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoEdictSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEdictSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
