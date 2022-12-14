import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageNewComponent } from './marriage-new.component';

describe('MarriageNewComponent', () => {
  let component: MarriageNewComponent;
  let fixture: ComponentFixture<MarriageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
