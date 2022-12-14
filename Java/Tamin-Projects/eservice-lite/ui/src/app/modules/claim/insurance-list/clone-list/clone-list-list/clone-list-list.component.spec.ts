import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneListListComponent } from './clone-list-list.component';

describe('CloneListListComponent', () => {
  let component: CloneListListComponent;
  let fixture: ComponentFixture<CloneListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
