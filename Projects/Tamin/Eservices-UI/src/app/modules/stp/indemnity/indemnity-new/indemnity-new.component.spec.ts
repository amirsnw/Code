import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemnityNewComponent } from './indemnity.component';

describe('IndemnityComponent', () => {
  let component: IndemnityNewComponent;
  let fixture: ComponentFixture<IndemnityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndemnityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndemnityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
