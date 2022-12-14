import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPapersDisplayComponent } from './important-papers-display.component';

describe('ImportantPapersDisplayComponent', () => {
  let component: ImportantPapersDisplayComponent;
  let fixture: ComponentFixture<ImportantPapersDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportantPapersDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPapersDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
