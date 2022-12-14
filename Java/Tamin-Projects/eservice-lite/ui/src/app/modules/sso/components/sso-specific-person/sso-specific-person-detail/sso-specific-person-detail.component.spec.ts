import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSpecificPersonDetailComponent } from './sso-specific-person-detail.component';

describe('SsoInsuredPaymentSheetListComponent', () => {
  let component: SsoSpecificPersonDetailComponent;
  let fixture: ComponentFixture<SsoSpecificPersonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSpecificPersonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSpecificPersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
