import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSubdominantInfoComponent } from './sso-subdominant-info.component';

describe('SsoSubdominantInfoComponent', () => {
  let component: SsoSubdominantInfoComponent;
  let fixture: ComponentFixture<SsoSubdominantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSubdominantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSubdominantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
