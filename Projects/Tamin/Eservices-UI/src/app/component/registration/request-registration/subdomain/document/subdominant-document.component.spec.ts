import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdominantDocumentComponent } from './subdominant-document.component';

describe('SubdominantDocumentComponent', () => {
  let component: SubdominantDocumentComponent;
  let fixture: ComponentFixture<SubdominantDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdominantDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdominantDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
