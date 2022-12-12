import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoMofasaComponent } from './sso-mofasa.component';

describe('SsoMofasaComponent', () => {
  let component: SsoMofasaComponent;
  let fixture: ComponentFixture<SsoMofasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoMofasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoMofasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
