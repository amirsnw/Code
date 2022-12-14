import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailItemRowModalComponent } from './list-detail-item-row-modal.component';

describe('ListDetailItemRowModalComponent', () => {
  let component: ListDetailItemRowModalComponent;
  let fixture: ComponentFixture<ListDetailItemRowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailItemRowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailItemRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
