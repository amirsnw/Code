import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdominantInfoComponent } from './subdominant-info.component';

describe('SubdominantInfoComponent', () => {
  let component: SubdominantInfoComponent;
  let fixture: ComponentFixture<SubdominantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdominantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdominantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
