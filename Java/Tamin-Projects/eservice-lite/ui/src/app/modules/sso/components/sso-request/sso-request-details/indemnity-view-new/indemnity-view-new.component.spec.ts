import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemnityViewNewComponent } from './indemnity-view-new.component';

describe('IndemnityViewNewComponent', () => {
  let component: IndemnityViewNewComponent;
  let fixture: ComponentFixture<IndemnityViewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndemnityViewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndemnityViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
