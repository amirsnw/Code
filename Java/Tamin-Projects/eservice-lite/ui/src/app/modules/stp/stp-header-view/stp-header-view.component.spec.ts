import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpHeaderViewComponent } from './stp-header-view.component';

describe('StpHeaderViewComponent', () => {
  let component: StpHeaderViewComponent;
  let fixture: ComponentFixture<StpHeaderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpHeaderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpHeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
