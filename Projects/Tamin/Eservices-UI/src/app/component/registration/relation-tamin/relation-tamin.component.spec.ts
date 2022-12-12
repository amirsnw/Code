import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationTaminComponent } from './relation-tamin.component';

describe('RelationTaminComponent', () => {
  let component: RelationTaminComponent;
  let fixture: ComponentFixture<RelationTaminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationTaminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationTaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
