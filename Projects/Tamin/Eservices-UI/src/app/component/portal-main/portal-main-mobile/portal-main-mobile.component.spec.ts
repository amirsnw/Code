import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMainMobileComponent } from './portal-main-mobile.component';

describe('PortalMainMobileComponent', () => {
  let component: PortalMainMobileComponent;
  let fixture: ComponentFixture<PortalMainMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMainMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMainMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
