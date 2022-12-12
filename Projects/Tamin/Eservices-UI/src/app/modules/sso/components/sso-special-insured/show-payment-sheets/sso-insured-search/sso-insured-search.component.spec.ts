import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SsoInsuredSearchComponent} from './sso-insured-search.component';


describe('SsoInsuredSearchComponent', () => {
  let component: SsoInsuredSearchComponent;
  let fixture: ComponentFixture<SsoInsuredSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoInsuredSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoInsuredSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
