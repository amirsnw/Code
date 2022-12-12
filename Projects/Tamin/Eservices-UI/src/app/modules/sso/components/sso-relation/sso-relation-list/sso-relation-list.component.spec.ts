import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  SsoRelationListComponent} from './sso-relation-list.component';


describe('SsoPersonalImageDetailComponent', () => {
  let component: SsoRelationListComponent;
  let fixture: ComponentFixture<SsoRelationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRelationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRelationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
