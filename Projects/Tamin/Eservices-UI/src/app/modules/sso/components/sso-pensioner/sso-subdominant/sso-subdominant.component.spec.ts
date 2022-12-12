import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSubdominantComponent } from './sso-subdominant.component';

describe('SsoSubdominantComponent', () => {
  let component: SsoSubdominantComponent;
  let fixture: ComponentFixture<SsoSubdominantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSubdominantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSubdominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
