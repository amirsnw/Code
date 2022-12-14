import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPersonalImageComponent } from './sso-personal-image.component';

describe('SsoPersonalImageComponent', () => {
  let component: SsoPersonalImageComponent;
  let fixture: ComponentFixture<SsoPersonalImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPersonalImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPersonalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
