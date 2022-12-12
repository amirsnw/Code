import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPapersNewComponent } from './important-papers-new.component';

describe('ImportantPapersNewComponent', () => {
  let component: ImportantPapersNewComponent;
  let fixture: ComponentFixture<ImportantPapersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPapersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPapersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
