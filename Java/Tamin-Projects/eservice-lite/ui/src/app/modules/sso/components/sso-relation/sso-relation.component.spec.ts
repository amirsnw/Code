import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRelationComponent } from './sso-relation.component';

describe('SsoPersonalImageComponent', () => {
  let component: SsoRelationComponent;
  let fixture: ComponentFixture<SsoRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
