import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpRequestsComponent } from './stp-requests.component';

describe('StpRequestsComponent', () => {
  let component: StpRequestsComponent;
  let fixture: ComponentFixture<StpRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
