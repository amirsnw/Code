import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AllInspectionsearchComponent, AllRequestSearchComponent, SsoInspectionSearchComponent} from './sso-inspection-search.component';


describe('SsoInspectionsearchComponent', () => {
  let component: SsoInspectionSearchComponent;
  let fixture: ComponentFixture<SsoInspectionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoInspectionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoInspectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
