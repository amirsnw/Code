import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYearsSpecComponent } from './new-years-spec.component';

describe('NewYearsSpecComponent', () => {
  let component: NewYearsSpecComponent;
  let fixture: ComponentFixture<NewYearsSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewYearsSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewYearsSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
