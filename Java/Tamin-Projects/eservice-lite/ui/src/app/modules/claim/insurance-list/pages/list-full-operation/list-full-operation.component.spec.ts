import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFullOperationComponent } from './list-full-operation.component';

describe('ListFullOperationComponent', () => {
  let component: ListFullOperationComponent;
  let fixture: ComponentFixture<ListFullOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFullOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFullOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
