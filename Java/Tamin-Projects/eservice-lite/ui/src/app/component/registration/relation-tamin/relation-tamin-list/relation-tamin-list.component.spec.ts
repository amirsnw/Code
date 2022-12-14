import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationTaminListComponent } from './relation-tamin-list.component';

describe('RelationTaminListComponent', () => {
  let component: RelationTaminListComponent;
  let fixture: ComponentFixture<RelationTaminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationTaminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationTaminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
