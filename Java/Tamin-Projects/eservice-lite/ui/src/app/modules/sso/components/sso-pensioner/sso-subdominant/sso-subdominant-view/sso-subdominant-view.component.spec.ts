import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSubdominantViewComponent } from './sso-subdominant-view.component';

describe('SsoSubdominantViewComponent', () => {
  let component: SsoSubdominantViewComponent;
  let fixture: ComponentFixture<SsoSubdominantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSubdominantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSubdominantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
