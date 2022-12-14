import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationEditContainerComponent } from './relation-edit-container.component';

describe('RelationEditContainerComponent', () => {
  let component: RelationEditContainerComponent;
  let fixture: ComponentFixture<RelationEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
