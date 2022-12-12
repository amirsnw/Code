import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  SsoPersonalImageDetailComponent} from './sso-personal-image-detail.component';


describe('SsoPersonalImageDetailComponent', () => {
  let component: SsoPersonalImageDetailComponent;
  let fixture: ComponentFixture<SsoPersonalImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPersonalImageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPersonalImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
