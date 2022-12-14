import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdominantComponent } from './subdominant.component';

describe('SubdominantComponent', () => {
  let component: SubdominantComponent;
  let fixture: ComponentFixture<SubdominantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdominantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
