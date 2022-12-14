import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReqDetnComputComponent } from './new-req-detn-comput.component';

describe('NewReqDetnComputComponent', () => {
  let component: NewReqDetnComputComponent;
  let fixture: ComponentFixture<NewReqDetnComputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReqDetnComputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReqDetnComputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
