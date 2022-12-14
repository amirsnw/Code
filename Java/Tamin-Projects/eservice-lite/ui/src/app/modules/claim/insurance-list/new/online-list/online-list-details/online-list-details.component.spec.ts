import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineListDetailsComponent } from './online-list-details.component';

describe('OnlineListDetailsComponent', () => {
  let component: OnlineListDetailsComponent;
  let fixture: ComponentFixture<OnlineListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
