import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpRequestViewComponent } from './stp-request-view.component';

describe('StpRequestViewComponent', () => {
  let component: StpRequestViewComponent;
  let fixture: ComponentFixture<StpRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
