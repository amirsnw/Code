import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFullOperationModalComponent } from './list-full-operation-modal.component';

describe('ListFullOperationModalComponent', () => {
  let component: ListFullOperationModalComponent;
  let fixture: ComponentFixture<ListFullOperationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFullOperationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFullOperationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
