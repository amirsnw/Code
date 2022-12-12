import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackHoldersComponent } from './stack-holders.component';

describe('StackHoldersComponent', () => {
  let component: StackHoldersComponent;
  let fixture: ComponentFixture<StackHoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackHoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
