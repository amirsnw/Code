import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotRequestsComponent } from './pilot-requests.component';

describe('PilotRequestsComponent', () => {
  let component: PilotRequestsComponent;
  let fixture: ComponentFixture<PilotRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilotRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
