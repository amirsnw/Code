import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResultNewComponent } from './request-result-new.component';

describe('RequestResultNewComponent', () => {
  let component: RequestResultNewComponent;
  let fixture: ComponentFixture<RequestResultNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResultNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResultNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
