import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneListModalComponent } from './clone-list-modal.component';

describe('CloneListModalComponent', () => {
  let component: CloneListModalComponent;
  let fixture: ComponentFixture<CloneListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
