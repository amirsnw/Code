import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPapersComponent } from './important-papers.component';

describe('ImportantPapersComponent', () => {
  let component: ImportantPapersComponent;
  let fixture: ComponentFixture<ImportantPapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
