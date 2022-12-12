import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPensionAccountSearchComponent } from './sso-pension-account-search.component';

describe('SsoPensionAccountSearchComponent', () => {
  let component: SsoPensionAccountSearchComponent;
  let fixture: ComponentFixture<SsoPensionAccountSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPensionAccountSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPensionAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
