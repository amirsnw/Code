import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPapersListComponent } from './important-papers-list.component';

describe('ImportantPapersListComponent', () => {
  let component: ImportantPapersListComponent;
  let fixture: ComponentFixture<ImportantPapersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPapersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPapersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
