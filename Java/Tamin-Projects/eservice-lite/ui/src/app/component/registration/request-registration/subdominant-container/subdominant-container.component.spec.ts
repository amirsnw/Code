import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdominantContainerComponent } from './subdominant-container.component';

describe('SubdominantContainerComponent', () => {
  let component: SubdominantContainerComponent;
  let fixture: ComponentFixture<SubdominantContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdominantContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdominantContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
