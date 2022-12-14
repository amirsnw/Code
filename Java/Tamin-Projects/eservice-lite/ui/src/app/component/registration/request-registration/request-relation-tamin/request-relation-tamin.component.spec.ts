import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRelationTaminComponent } from './request-relation-tamin.component';

describe('RequestRelationTaminComponent', () => {
  let component: RequestRelationTaminComponent;
  let fixture: ComponentFixture<RequestRelationTaminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRelationTaminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRelationTaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
