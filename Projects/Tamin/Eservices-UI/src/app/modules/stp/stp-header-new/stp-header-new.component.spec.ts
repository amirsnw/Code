import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: StpHeaderComponent;
  let fixture: ComponentFixture<StpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
