import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationViewComponent } from './occupation-view.component';

describe('OccupationViewComponent', () => {
  let component: OccupationViewComponent;
  let fixture: ComponentFixture<OccupationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
