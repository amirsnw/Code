import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelanceLocationComponent} from './freelance-location.component';

describe('FreelanceLocationComponent', () => {
  let component: FreelanceLocationComponent;
  let fixture: ComponentFixture<FreelanceLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceLocationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
