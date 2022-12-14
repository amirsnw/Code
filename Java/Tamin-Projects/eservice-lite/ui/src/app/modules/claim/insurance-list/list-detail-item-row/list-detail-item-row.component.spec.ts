import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailItemRowComponent } from './list-detail-item-row.component';

describe('ListDetailItemRowComponent', () => {
  let component: ListDetailItemRowComponent;
  let fixture: ComponentFixture<ListDetailItemRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailItemRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailItemRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
