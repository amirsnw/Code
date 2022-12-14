import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  SsoRelationSearchComponent} from './sso-relation-search.component';


describe('SsoPersonalImageSearchComponent', () => {
  let component: SsoRelationSearchComponent;
  let fixture: ComponentFixture<SsoRelationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRelationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRelationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
