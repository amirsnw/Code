import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  SsoPersonalImageSearchComponent} from './sso-personal-image-search.component';


describe('SsoPersonalImageSearchComponent', () => {
  let component: SsoPersonalImageSearchComponent;
  let fixture: ComponentFixture<SsoPersonalImageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPersonalImageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPersonalImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
