import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageViewNewComponent } from './marriage-view-new.component';

describe('MarriageViewNewComponent', () => {
  let component: MarriageViewNewComponent;
  let fixture: ComponentFixture<MarriageViewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageViewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
