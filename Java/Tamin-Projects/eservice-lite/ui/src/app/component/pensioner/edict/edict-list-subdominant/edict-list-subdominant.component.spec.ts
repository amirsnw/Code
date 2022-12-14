import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictListSubdominantComponent } from './edict-list-subdominant.component';

describe('EdictListSubdominantComponent', () => {
  let component: EdictListSubdominantComponent;
  let fixture: ComponentFixture<EdictListSubdominantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictListSubdominantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictListSubdominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
