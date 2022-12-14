import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopFullInfoSearchComponent } from './sso-workshop-full-info-search.component';

describe('SsoWorkshopFullInfoSearchComponent', () => {
  let component: SsoWorkshopFullInfoSearchComponent;
  let fixture: ComponentFixture<SsoWorkshopFullInfoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopFullInfoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopFullInfoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
