import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNewComponent } from './funeral-new.component';

describe('FuneralComponent', () => {
  let component: FuneralNewComponent;
  let fixture: ComponentFixture<FuneralNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
