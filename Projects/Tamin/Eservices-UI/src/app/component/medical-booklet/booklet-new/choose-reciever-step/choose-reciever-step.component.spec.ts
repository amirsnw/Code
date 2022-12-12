import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRecieverStepComponent } from './choose-reciever-step.component';

describe('ChooseRecieverStepComponent', () => {
  let component: ChooseRecieverStepComponent;
  let fixture: ComponentFixture<ChooseRecieverStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRecieverStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRecieverStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
