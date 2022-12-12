import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  SsoSpecificPersonSearchComponent} from './sso-specific-person-search.component';


describe('SsoPersonalImageSearchComponent', () => {
  let component: SsoSpecificPersonSearchComponent;
  let fixture: ComponentFixture<SsoSpecificPersonSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSpecificPersonSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSpecificPersonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
