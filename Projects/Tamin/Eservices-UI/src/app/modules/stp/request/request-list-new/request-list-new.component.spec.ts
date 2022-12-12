import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListNewComponent } from './request-list-new.component';

describe('RequestListNewComponent', () => {
  let component: RequestListNewComponent;
  let fixture: ComponentFixture<RequestListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
