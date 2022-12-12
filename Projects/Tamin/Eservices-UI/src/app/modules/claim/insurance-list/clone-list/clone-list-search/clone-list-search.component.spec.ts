import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneListSearchComponent } from './clone-list-search.component';

describe('CloneListSearchComponent', () => {
  let component: CloneListSearchComponent;
  let fixture: ComponentFixture<CloneListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
