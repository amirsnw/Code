import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyViewNewComponent } from './pregnancy-view-new.component';

describe('PregnancyViewNewComponent', () => {
  let component: PregnancyViewNewComponent;
  let fixture: ComponentFixture<PregnancyViewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnancyViewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
