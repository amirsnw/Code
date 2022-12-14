import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoOccupationViewComponent } from './sso-occupation-view.component';

describe('SsoOccupationViewComponent', () => {
  let component: SsoOccupationViewComponent;
  let fixture: ComponentFixture<SsoOccupationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoOccupationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoOccupationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
