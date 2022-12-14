import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPapersSearchComponent } from './important-papers-search.component';

describe('ImportantPapersSearchComponent', () => {
  let component: ImportantPapersSearchComponent;
  let fixture: ComponentFixture<ImportantPapersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPapersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPapersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
