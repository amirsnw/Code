import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyNewComponent } from './pregnancy-new.component';

describe('PregnancyNewComponent', () => {
  let component: PregnancyNewComponent;
  let fixture: ComponentFixture<PregnancyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnancyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
