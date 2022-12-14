import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SsoEblaghMofasaComponent} from './sso-eblagh-mofasa.component';

describe('SsoEblaghMofasaComponent', () => {
  let component: SsoEblaghMofasaComponent;
  let fixture: ComponentFixture<SsoEblaghMofasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsoEblaghMofasaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoEblaghMofasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
