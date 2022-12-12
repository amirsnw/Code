import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralViewNewComponent } from './funeral-view-new.component';

describe('FuneralViewNewComponent', () => {
  let component: FuneralViewNewComponent;
  let fixture: ComponentFixture<FuneralViewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralViewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
